const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => console.log('DB Connected'))
  .catch(err => console.log('DB failed to connect', err));

const schema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  years: { type: Object, required: true },
  terms: { type: Object, required: true },
  courses: { type: Object, required: true },
  lastAccessed: Date,

  // If this is a template, reference what it was copied from
  // Otherwise, just be null
  original: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan' },
  isPublic: { type: Boolean, default: false },
});

module.exports = mongoose.model('Plan', schema);
