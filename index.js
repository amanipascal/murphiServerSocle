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

const {connectDB} = require("./config");
//-------------------------------------------------------

const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');



// ----------------------------------------------------

// (async function db() {
//   await connection();
// })();

// Connect to database
connectDB();
// system's middlewares
app.use(cors());
app.use(express.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// API routes
const authRoute = require("./routes/authRoute")
const userRouter = require('./routes/usersRoute');
const fileRouter = require('./routes/fileRoute');
app.use("/api/v1", authRoute);
app.use("/api/v1", userRouter);

app.get('/protected', require('./middlewares/authenticate'), (req, res) => {
  res.json({message: 'Welcome to the protected route'});
});

app.get('/', (req, res) => {
  res.sendFile('index');
});
// --------------------------------- File upload with GridFS ----------------------------------------

// Mongo URI
const mongoURI = process.env.DB_URL || "";

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    console.log('File :', file)
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  console.log('File :', req.file)
  res.json({ file: req.file });
});


// const upload  = require("./utils/upload");

// app.post("/upload/file", upload.single("file"), async (req, res) => {
//   try {
//     res.status(201).json({ text: "File uploaded successfully !" });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       error: { text: "Unable to upload the file", error },
//     });
//   }
// });

app.use((error, req, res, next) => {
  console.log(error)
  res.status(500).json({ error: error.message });
});

app.listen(port, () => {
  console.log("Listening to Port ", port);
});

module.exports = app;
