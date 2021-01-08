const express = require('express');
const router = express.Router();
const About = require('../../models/About');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

router.post(
  '/',
  [auth, [check('bio', 'Bio is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let errorstuff = errors.array();
      return res.status(400).json({ errors: errors.array() });
    }

    //build profile object
    const { _id, bio, image } = req.body;

    const aboutFields = { bio, image };

    if (image) aboutFields.image = image;

    try {
      //find project - if project already exists then update it with the new fields
      let AboutFromDB = await About.findOne({ _id: _id });

      if (AboutFromDB) {
        AboutFromDB = await About.findOneAndUpdate(
          { _id: _id },
          { $set: aboutFields },
          { new: true }
        );
        return res.status(200).json(AboutFromDB);
      }
      // Create
      newAbout = new About(about);

      await newAbout.save();
      return res.status(200).json(about);
    } catch (err) {
      console.error(err);
      return res.status(500).send('Server Error');
    }
  }
);

router.post('/image', auth, async (req, res) => {
  //build image
  const { _id, image } = req.body;
  try {
    //find project - update image field
    let AboutFromDB = await About.findOne({ _id: _id });

    AboutFromDB = await About.findOneAndUpdate(
      { _id: _id },
      { image: image },
      { new: true }
    );
    return res.status(200).json(AboutFromDB);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'update image failed' });
  }
});

// @route GET api/about
// @desc Test get about info
// @access Public

router.get('/', async (req, res) => {
  try {
    const about = await About.find();
    res.json(about);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Service Error');
  }
});

module.exports = router;
