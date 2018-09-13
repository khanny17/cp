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
  .then(() => {
    schools = await School.find({}, { name: true, aliases: true }).lean();
  })
  .catch(err => console.log('DB failed to connect', err));


module.exports = cors(jwt_auth(process.env.JWT_SECRET)
(async(req, res) => {
  switch(action) {
    default: return schools;
  }
}));
