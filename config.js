const mongoose = require("mongoose");
const GridFs_Strean = require('gridfs-stream');
// const multer = require("multer");
// const { GridFsStorage } = require("multer-gridfs-storage");
// const crypto = require('crypto');
const DB_URL = process.env.DB_URL || "";

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
		console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};



let gfs;
(() => {
  mongoose.connection.on("connected", () => {
    gfs = GridFs_Strean(mongoose.connection.db, mongoose.mongo);
    gfs.collection('uploads');
  });
})();


// let bucket;
// (() => {
//   mongoose.connection.on("connected", () => {
//     bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
//       bucketName: "filesBucket",
//     });
//   });
// })();


// Create storage engine

// const storage = new GridFsStorage({
//   url: DB_URL,
//   cache: true,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       console.log('return new Promise')
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads'
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });

// const upload = multer({ storage });



module.exports = {connectDB, gfs};