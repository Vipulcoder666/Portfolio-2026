const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  client: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  highlights: [String],
  technologies: [String],
  metrics: {
    map: String,
    precision: String,
    performance: String
  },
  image: String,
  featured: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Project', ProjectSchema);
