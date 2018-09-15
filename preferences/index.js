const mongoose = require('mongoose');
const jwt_auth = require('micro-jwt-auth');
const cors = require('micro-cors')();
const { json } = require('micro');
const Preferences = require('./preferences_model');

const mongooseOptions = {
  reconnectTries: 120,
  reconnectInterval: 1000,
  useNewUrlParser: true,
};
mongoose.connect(process.env.DB_URL, mongooseOptions)
  .then(() => console.log('DB Connected'))
  .catch(err => console.log('DB failed to connect', err));


module.exports = cors(jwt_auth(process.env.JWT_SECRET)
(async(req, res) => {

  const action = req.url.split('/')[1];

  switch(action) {
    case 'get': return await get(req);
    case 'set': return await set(req);
    default: return `Preferences API Root`;
  }
}));

async function get(req) {
  const prefs = await Preferences.findOne({ user: req.jwt._id }).lean();

  return prefs || {};
}

async function set(req) {
  const body = await json(req);
  const { school } = body;

  return await Preferences.updateOne({
    user: req.jwt._id,
  }, {
    school,
  }, { upsert: true });
}
