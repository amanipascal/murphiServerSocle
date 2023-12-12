require("express-async-errors");
require("dotenv").config();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const express = require("express");
const app = express();
const connection = require("./db");
const cors = require("cors");
const port = 8080;



(async function db() {
  await connection();
})();

app.use(cors());
app.use(express.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// API routes

app.use("/api/v1", require("./routes/authRoute"));
const userRouter = require('./routes/usersRoute')
app.use("/api/v1", userRouter);
// app.use("/api/v1/users/me",  require('./middlewares/authenticate'), require('./controllers/security/getMeController') );

app.get('/protected', require('./middlewares/authenticate'), (req, res) => {
  res.json({message: 'Welcome to the protected route'});
});

app.use((error, req, res, next) => {
  console.log(error)
  res.status(500).json({ error: error.message });
});

app.listen(port, () => {
  console.log("Listening to Port ", port);
});

module.exports = app;
