const mongoose = require('mongoose');
const cors = require('micro-cors')();
const { json, send } = require('micro');
const jwt_auth = require('micro-jwt-auth');
const match = require('micro-match');
const Template = require('./template_model');

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
    case 'publish': return await publish(req);
    case 'list': return await list(req);
    case 'tags': return await tags(req);
    case 'star': return await star(req);
    case 'get': return await get(req);
    default: return `Templates API Root`;
  }
}));


async function publish(req) {
  const body = await json(req);
  const { plan, description, school, tags, major } = body;
  const { years, terms, courses, details, colorscheme, requirements } = plan;

  await Template.create({
    plan: {
      years, terms, courses, details, colorscheme, requirements,
    },
    description, school, major, tags,
    stars: [],
    owner: req.jwt._id,
    lastUpdated: Date.now(),
  });

  return { success: true };
}

async function list(req) {
  return await Template.find({}, {
    "plan.details.title": true,
    stars: true,
    owner: true,
    lastUpdated: true,
    school: true,
    major: true,
    tags: true,
    description: true,
  });
}

async function tags(req) {
  // TODO one day this may be its own microservice
  return ['Example tag', 'ANOTHER_EXAMPLE', '1234'];
}

async function star(req) {
  const body = await json(req);
  let template = await Template.findOne({ _id: body._id });

  let exists = template.stars.some(star => {
    // "==" IS CORRECT HERE!! === will fail because it is an array of
    // mongoose objects.
    if(star == req.jwt._id) {
      return true;
    }
  });

  if(exists) {
    // "!=" IS CORRECT HERE!! !== will fail because it is an array of
    // mongoose objects.
    template.stars = template.stars.filter(id => id != req.jwt._id);
  } else {
    template.stars.push(req.jwt._id);
  }

  await template.save();
  return template.stars.toObject();
}

async function get(req) {
  const { _id } = match('/get/:_id', req.url);
  return await Template.findOne({ _id: _id });
}
