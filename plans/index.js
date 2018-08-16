const cors = require('micro-cors')();
const { json, send } = require('micro');
const jwt_auth = require('micro-jwt-auth');
const match = require('micro-match');
const Plan = require('./plan_model');


module.exports = cors(jwt_auth(process.env.JWT_SECRET)
(async(req, res) => {

  const action = req.url.split('/')[1];

  switch(action) {
    case 'save': return await save(req);
    case 'open': return await open(req);
    case 'delete': return await deletePlan(req);
    case 'mine': return await mine(req);
    default: return `Plans API Root`;
  }
}));

async function deletePlan(req) {
  const { _id } = match('/delete/:_id', req.url);

  if(!_id) {
    throw new Error('No plan id specified');
  }

  await Plan.remove({
    _id: _id,
    owner: req.jwt._id,
  });

  return { success: true };
}

async function mine(req) {
  let plans = await Plan.find({
    owner: req.jwt._id,
  });

  // Send a summary of the plans
  return plans.map(plan => ({
    title: plan.details.title,
    _id: plan._id,
    lastAccessed: plan.lastAccessed,
  }));
}

async function open(req) {
  const body = await json(req);

  let plan = await Plan.findOne({
    _id: body._id,
    owner: req.jwt._id,
  });

  if(!plan) {
    throw new Error('Plan not found');
  }

  plan.lastAccessed = Date.now();
  plan.save();

  return plan.toObject();
}

async function save(req) {
  const body = await json(req);

  if(body._id) {
    return update(req, body);
  } else {
    return create(req, body);
  }
}

async function create(req, plan) {
  const { years, terms, courses, original, details, colorscheme,
          requirements } = plan;
  const newPlan = await Plan.create({
    years, terms, courses, original, details, colorscheme, requirements,
    owner: req.jwt._id,
    lastAccessed: Date.now(),
    original: null,
  });

  return newPlan.toObject();
}

async function update(req, plan) {
  const { _id, years, terms, courses, details, colorscheme,
          requirements } = plan;

  const updatedPlan = await Plan.findOneAndUpdate({
    _id: _id,
    owner: req.jwt._id,
  },{
    years, terms, courses, details, colorscheme, requirements,
    lastAccessed: Date.now(),
  }, { 'new': true });

  console.log('-----', updatedPlan);

  return updatedPlan.toObject();
}
