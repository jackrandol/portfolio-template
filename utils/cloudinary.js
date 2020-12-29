const config = require('config');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: config.get('cloudinaryName'),
  api_key: config.get('cloudinaryApiKey'),
  api_secret: config.get('cloudinaryApiSecret'),
});

module.exports = { cloudinary };
