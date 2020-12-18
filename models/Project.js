const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
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
      title: { type: String, required: true },
      url: { type: String, require: true },
    },
  ],
  externalUrl: { type: String, required: false },
});

module.exports = mongoose.model('project', ProjectSchema);
