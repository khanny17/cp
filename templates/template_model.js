const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new mongoose.Schema({
  owner: { type: ObjectId, ref: 'User', required: true },
  plan: {
    details: {
      title: { type: String, required: true },
      years: { type: Array, required: true },
    },
    years: { type: Object, required: true },
    terms: { type: Object, required: true },
    courses: { type: Object, required: true },
    colorscheme: { type: Object, required: true },
    requirements: { type: Object, required: true },
  },

  lastUpdated: Date,
  description: String,
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true
  },
  major: String,
  tags: [String],
  stars: [ObjectId],
});

module.exports = mongoose.model('Template', schema);
