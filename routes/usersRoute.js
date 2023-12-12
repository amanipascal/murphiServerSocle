const router = require('express').Router()
const { getMe } = require('../controllers/security')
const {authenticate} = require('../middlewares')

// router.get('users/me', authenticate, getMe)
router.route('/users/me').get(authenticate, getMe)

module.exports = router;