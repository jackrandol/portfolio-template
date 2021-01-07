const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  date: { type: Date, required: true },
  images: [
    {
      id: { type: String, required: false },
      fileName: { type: String, required: false },
      url: { type: String, required: false },
    },
  ],
  videos: [
    {
      id: { type: String, required: false },
      fileName: { type: String, required: false },
      url: { type: String, required: false },
    },
  ],
  links: [
    {
      id: { type: String, required: false },
      link: { type: String, required: false },
    },
  ],
});

module.exports = mongoose.model('project', ProjectSchema);
