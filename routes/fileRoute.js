const router = require('express').Router()
const { upload } = require("../utils/upload");
// const { uploadFile } = require('../controllers/files')
// const {authenticate} = require('../middlewares')

// router.get('users/me', authenticate, getMe)
// router.route('/upload/file').get([authenticate], getMe)
// router.route('/upload/file').post(upload().single("file"), async (req, res) => {
//     try {
//         res.status(201).json({ text: "File uploaded successfully !" });
//       } catch (error) {
//         console.log(error);
//         res.status(400).json({
//           error: { text: "Unable to upload the file", error },
//         });
//       }
// })

module.exports = router;
