const express = require('express');
const router = express.Router();
const { cloudinary } = require('../../utils/cloudinary');
const config = require('config');

router.post('/', async (req, res) => {
  try {
    const file = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(file, {
      upload_preset: 'portfolio_dev',
    });
    console.log(uploadResponse);
    res.json({ msg: 'yaya' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
});

module.exports = router;
