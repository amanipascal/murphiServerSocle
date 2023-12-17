require("express-async-errors");
require("dotenv").config();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const express = require("express");
const app = express();
const compression = require('compression')
// const connection = require("./db");
const cors = require("cors");
const port = 8080;

const {connectDB} = require("./config");
//-------------------------------------------------------
const sse = require('./middlewares/sse')

// Connect to database
connectDB();
// system's middlewares
app.use(cors());
app.use(compression())
app.use(express.json());
app.use(logger('dev'));
app.use(express.json());
app.use(sse());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// API routes
const authRoute = require("./routes/authRoute")
const userRouter = require('./routes/usersRoute');
const fileRouter = require('./routes/fileRoute');
const todoRouter = require('./routes/todoRoute')
app.use("/api/v1", authRoute);
app.use("/api/v1", userRouter);
app.use("/api/v1", fileRouter);
app.use("/api/v1", todoRouter);

app.get('/protected', require('./middlewares/authenticate'), (req, res) => {
  res.json({message: 'Welcome to the protected route'});
});

app.get('/', (req, res) => {
  res.sendFile('index');
});

app.get('/event', (req, res) => {
  res.initStream()
})

app.use((error, req, res, next) => {
  console.log(error)
  res.status(500).json({ error: error.message });
});

app.listen(port, () => {
  console.log("Listening to Port ", port);
});

module.exports = app;
