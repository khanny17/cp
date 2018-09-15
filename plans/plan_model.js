const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => console.log('DB Connected'))
  .catch(err => console.log('DB failed to connect', err));

const schema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  details: {
    title: { type: String, required: true },
    years: { type: Array, required: true },
    requirements: { type: Array, required: true },
  },
  years: { type: Object, required: true },
  terms: { type: Object, required: true },
  courses: { type: Object, required: true },
  lastAccessed: Date,
  colorscheme: { type: Object, required: true },
  requirements: { type: Object, required: true },
}, { minimize: false });

module.exports = mongoose.model('Plan', schema);
