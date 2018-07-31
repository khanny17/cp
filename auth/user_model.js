const mongoose = require('mongoose');
const bcrypt  = require('bcrypt');
const { isEmail } = require('validator');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => console.log('DB Connected'))
  .catch(err => console.log('DB failed to connect', err));


const schema = new mongoose.Schema({
  email: {
    type: String, unique: true, lowercase: true,
    validate: [ isEmail, 'invalid email' ],
  },
  name: { type: String },
  password: { type: String, select: false },
});

schema.pre('save', function(next) {
  if(!this.isModified('password') && !this.isNew) {
    return next(); //Nothing to do
  }

  // Salt and Hash password
  let user = this;
  return bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(user.password, salt))
    .then(hash => user.password = hash);
});

schema.methods.comparePassword = function(passw) {
  return bcrypt.compare(passw, this.password);
};


module.exports = mongoose.model('User', schema);
