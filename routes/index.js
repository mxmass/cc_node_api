const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'GET / submitted' })
})

router.use('/api/user', require('./user.routes'))

module.exports = router
