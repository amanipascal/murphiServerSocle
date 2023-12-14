const router = require('express').Router()
// const { upload } = require('../middlewares')
const upload = require('../middlewares/upload')

const {uploaded} = require('../controllers/files/uploads')


router.route('/upload').post(upload().single("file"), uploaded)


module.exports = router;
