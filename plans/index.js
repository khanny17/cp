const { json, send } = require('micro');
const jwt_auth = require('micro-jwt-auth');
const Plan = require('./plan_model');

module.exports = jwt_auth(process.env.JWT_SECRET)
(async(req, res) => {
  switch(req.url) {
    case '/save': return await save(req);
    default: send(res, 404);
  }
});

async function save(req) {
  const body = await json(req);

  if(body._id) {
    return update(req, body);
  } else {
    return create(req, body);
  }
}

async function create(req, plan) {
  const { name, years, terms, courses } = plan;
  const newPlan = await Plan.create({
    name, years, terms, courses,
    owner: req.jwt._id,
    lastAccessed: Date.now(),
    original: null,
  });

  return newPlan.toObject();
}

async function update(req, plan) {
  const { _id, name, years, terms, courses } = plan;
  const updatedPlan = await Plan.update({
    _id: _id,
    owner: req.jwt._id,
  },{
    name, years, terms, courses,
    lastAccessed: Date.now(),
  });

  return updatedPlan.toObject();
}
