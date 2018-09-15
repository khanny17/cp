const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  school: { type: mongoose.Schema.Types.ObjectId, ref: 'School' },
});

module.exports = mongoose.model('Preferences', schema);
