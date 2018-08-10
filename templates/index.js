const mongoose = require('mongoose');
const cors = require('micro-cors')();
const { json, send } = require('micro');
const jwt_auth = require('micro-jwt-auth');
const match = require('micro-match');
const Template = require('./template_model');
const School = require('./school_model');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => console.log('DB Connected'))
  .catch(err => console.log('DB failed to connect', err));



module.exports = cors(jwt_auth(process.env.JWT_SECRET)
(async(req, res) => {

  const action = req.url.split('/')[1];

  switch(action) {
    case 'publish': return await publish(req);
    case 'list': return await list(req);
    case 'tags': return await tags(req);
    case 'schools': return await schools(req);
    default: return `Templates API Root`;
  }
}));


async function publish(req) {
  const body = await json(req);
  const { plan, description, school, tags } = body;
  const { years, terms, courses, details, colorscheme } = plan;

  await Template.create({
    plan: {
      years, terms, courses, details, colorscheme,
    },
    description, school, tags,
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
    tags: true,
    description: true,
  });
}

async function tags(req) {
  // TODO
  return ['Example tag', 'ANOTHER_EXAMPLE', '1234'];
}

async function schools(req) {
  return School.find({}, { name: true, aliases: true }).lean();
}
