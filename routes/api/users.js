const express = require('express');
const router = express.Router();

// @route GET api/users
// @desc Test route to user
// @access Public
router.get('/', (req, res) => {
  res.send('user route');
});

module.exports = router;
