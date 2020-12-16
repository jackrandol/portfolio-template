const express = require('express');
const router = express.Router();

// @route GET api/projects
// @desc Test route to user
// @access Public
router.get('/', (req, res) => {
  res.send('projects route');
});

module.exports = router;
