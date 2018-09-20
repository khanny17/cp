const jwt_auth = require('../util/jwt-auth');
const uuidv1 = require('uuid/v1');
const validatePlan = require('./validate');

const AWS = require('aws-sdk');
const PLANS_TABLE = process.env.PLANS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: process.env.SERVERLESS_REGION
});


module.exports = jwt_auth(process.env.JWT_SECRET)
(async(event, context) => {
  if(!event.pathParameters) {
    return 'Plans API Root';
  }

  const action = event.pathParameters.action;

  switch(action) {
    case 'save': return await save(event);
    case 'open': return await open(event);
    case 'delete': return await deletePlan(event);
    case 'mine': return await mine(event);
    default: return `Unrecognized action {action}`;
  }
});

async function deletePlan(event) {
  const _id = event.pathParameters._id;

  if(!_id) {
    throw new Error('No plan id specified');
  }

  await dynamoDb.delete({
    TableName: PLANS_TABLE,
    Key: { _id: _id, },
    ConditionExpression:"plan_owner = :user",
    ExpressionAttributeValues: {
        ":user": event.jwt.email,
    }
  }).promise();

  return { success: true };
}

async function mine(event) {
  const result = await dynamoDb.query({
    TableName: PLANS_TABLE,
    IndexName: 'plan_owner',
    KeyConditionExpression: "plan_owner = :user",
    ExpressionAttributeValues: {
        ":user": event.jwt.email,
    }
  }).promise();

  const plans = result.Items;

  // Send a summary of the plans
  return plans.map(plan => ({
    title: plan.details.title,
    _id: plan._id,
    lastAccessed: plan.lastAccessed,
  }));
}

async function open(event) {
  const body = JSON.parse(event.body);

  const result = await dynamoDb.get({
    TableName: PLANS_TABLE,
    Key: { _id: body._id },
    ConditionExpression:"plan_owner = :user",
    ExpressionAttributeValues: {
        ":user": event.jwt.email,
    }
  }).promise();

  const plan = result.Item;

  if(!plan) {
    throw new Error('Plan not found');
  }

  dynamoDb.put({
    TableName: PLANS_TABLE,
    Item: {
      ...plan,
      lastAccessed: Date.now(),
    }
  });

  return plan;
}

async function save(event) {
  const body = JSON.parse(event.body);

  if(body._id) {
    return update(event, body);
  } else {
    return create(event, body);
  }
}

async function create(event, plan) {
  const { years, terms, courses, details, colorscheme, requirements } = plan;
  const _id = uuidv1();

  const newPlan = {
    _id, years, terms, courses, details, colorscheme, requirements,
    plan_owner: event.jwt.email,
    lastAccessed: Date.now(),
  };

  // Validate required properties
  validatePlan(newPlan); //Throws error if invalid

  const result = await dynamoDb.put({
    TableName: PLANS_TABLE,
    Item: newPlan,
  }).promise();

  return newPlan;
}

async function update(event, plan) {
  const { _id, years, terms, courses, details, colorscheme,
          requirements } = plan;

  const getResult = await dynamoDb.get({
    TableName: PLANS_TABLE,
    Key: { _id: _id },
    ConditionExpression:"plan_owner = :user",
    ExpressionAttributeValues: {
        ":user": event.jwt.email,
    }
  }).promise();

  const oldPlan = getResult.Item;

  if(!oldPlan) {
    throw new Error('Plan ' + _id + 'not found. Maybe you aren\'t logged in?');
  }

  const updatedPlan = {
    ...oldPlan,
    years, terms, courses, details, colorscheme, requirements,
    lastAccessed: Date.now(),
  };

  // Validate required properties
  validatePlan(updatedPlan); //Throws error if invalid

  await dynamoDb.put({
    TableName: PLANS_TABLE,
    Item: updatedPlan,
  }).promise();


  return updatedPlan;
}
