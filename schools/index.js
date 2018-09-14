const mongoose = require('mongoose');
const cors = require('micro-cors')();
const { json, send } = require('micro');
const School = require('./school_model');

// Just keep the schools in memory
let schools = null;

const mongooseOptions = {
  reconnectTries: 120,
  reconnectInterval: 1000,
  useNewUrlParser: true,
};
mongoose.connect(process.env.DB_URL, mongooseOptions)
  .then(() => console.log('DB Connected'))
  .then(() =>  School.find({}, { name: true, aliases: true }).lean())
  .then(s => schools = s)
  .catch(err => console.log('DB failed to connect', err));


module.exports = cors((async(req, res) => schools));
