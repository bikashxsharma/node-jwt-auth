const router = require('express').Router()
const { auth } = require('./verifyToken')
// get /api/post prefix
router.get('/', auth, (req, res) => {
  res.send(req.user._id)
})

module.exports = router;