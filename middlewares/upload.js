const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const crypto = require('crypto');
const path = require('path');
MONGODB_URL = process.env.DB_URL || "";


const upload = () => {
    const storage = new GridFsStorage({
        url: MONGODB_URL,
        file: (req, file) => {
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
    return multer({ storage });
}


module.exports = upload;





// Create storage engine

// export function upload() {
//     const mongodbUrl = "";
//     const storage = new GridFsStorage({
//       url: mongodbUrl,
//       file: (req, file) => {
//         return new Promise((resolve, _reject) => {
//           const fileInfo = {
//             filename: file.originalname,
//             bucketName: "filesBucket",
//           };
//           resolve(fileInfo);
//         });
//       },
//     });
  
//     return multer({ storage });
//   }
  
//   module.exports = { upload };




// const storage = new GridFsStorage({
//     url: process.env.DB_URL || "",
//     cache: true,
//     file: (req, file) => {
//       return new Promise((resolve, reject) => {
//         crypto.randomBytes(16, (err, buf) => {
//           if (err) {
//             return reject(err);
//           }
//           const filename = buf.toString('hex') + path.extname(file.originalname);
//           const fileInfo = {
//             filename: filename,
//             bucketName: 'uploads'
//           };
//           resolve(fileInfo);
//         });
//       });
//     }
//   });
  
//   const upload1 = multer({ storage });


//   module.exports = upload;