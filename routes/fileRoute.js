const router = require('express').Router()
// const { upload } = require('../middlewares')
const upload = require('../middlewares/upload')

const {uploaded} = require('../controllers/files/uploads')
const {singleFile} = require('../controllers/files/downloads')


router.route('/upload').post(upload().single("file"), uploaded)
router.get('/files/:filename', singleFile)

module.exports = router;
