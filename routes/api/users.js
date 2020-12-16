const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');

// @route POSt api/users
// @desc Register user
// @access Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid username').isEmail(),
    check(
      'password',
      'Please enter a Password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }
      res.send('User route');
      // encrypt password

      // return jsonwebtoken
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }

    console.log(req.body);
    res.send('user route');
  }
);

module.exports = router;
