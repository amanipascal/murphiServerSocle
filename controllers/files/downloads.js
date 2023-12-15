const mongoose = require('mongoose');
const grid = require('gridfs-stream');
const conn = mongoose.createConnection(process.env.DB_URL);

// Init gfs
let gfs, gridfsBucket;

(() => {
  mongoose.connection.on("connected", () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: 'uploads'
    });
    gfs = grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('uploads');
  });
})();


  exports.singleFile = async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    } catch (error) {
        res.json({message: error.message});
    }
  }

 // @route GET /files/:filename
// @desc  Display single file object
// app.get('/files/:filename',
// exports.singleFile = async (req, res) => {
//     console.log('req params :', req.params)
//     gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//         console.log('req.params.filename : ', req.params.filename , 'File  : ', file)
//       // Check if file
//       if (!file || file.length === 0) {
//         return res.status(404).json({
//           err: 'No file exists'
//         });
//       }
//       // File exists
//       return res.json(file);
//     });
//   };


