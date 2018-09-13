const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  aliases: { type: String, required: true },
});

module.exports = mongoose.model('School', schema);
