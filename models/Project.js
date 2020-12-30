const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: { type: Date, required: true },
  images: [
    {
      id: { type: String, required: true },
      fileName: { type: String, required: true },
      url: { type: String, require: true },
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
