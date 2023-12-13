const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const DB_URL = process.env.DB_URL || "";


// Create storage engine
// const upload = () => {

//   const storage = new GridFsStorage({url: DB_URL, file: (req, file) => {
//       return new Promise((resolve, _reject) => {
//         const fileInfo = { filename: file.originalname, bucketName: "filesBucket",  };
//         resolve(fileInfo);
//       });
//     },
//   });

//   return multer({ storage });
// }

// module.exports = { upload };

// ------------------------------------------

// const upload = () => {
//   return new GridFsStorage({
//     url: DB_URL,
//     file: (req, file) => {
//     console.log('File : ', file)
//     return new Promise((resolve, _reject) => {
//       const fileInfo = { filename: file.originalname, bucketName: "filesBucket" };
//       resolve(fileInfo);
//     });
//     },
//   });
// }

const storage = new GridFsStorage({
  url: DB_URL,
  file: (req, file) => {
  console.log('File : ', file)
  return new Promise((resolve, _reject) => {
    const fileInfo = { filename: file.originalname, bucketName: "filesBucket" };
    resolve(fileInfo);
  });
  },
});

module.exports = multer({storage})