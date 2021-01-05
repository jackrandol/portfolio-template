const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
  bio: {
    type: String,
    required: true,
  },
  image: {
    id: { type: String, required: false },
    fileName: { type: String, required: false },
    url: { type: String, required: false },
  },
});

module.exports = mongoose.model('about', AboutSchema);
