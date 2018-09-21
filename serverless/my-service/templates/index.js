const uuidv1 = require('uuid/v1');
const jwt_auth = require('../util/jwt-auth');
const validateTemplate = require('./validate');

const AWS = require('aws-sdk');
const TEMPLATES_TABLE = process.env.TEMPLATES_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: process.env.SERVERLESS_REGION
});


module.exports = jwt_auth(process.env.JWT_SECRET)
(async(event, res) => {

  if(!event.pathParameters) {
    return 'Templates API Root';
  }

  const action = event.pathParameters.action;

  switch(action) {
    case 'publish': return await publish(event);
    case 'list': return await list(event);
    case 'tags': return await tags(event);
    case 'star': return await star(event);
    case 'get': return await get(event);
    default: return `Templates API Root`;
  }
});


async function publish(event) {
  const body = JSON.parse(event.body);
  const { plan, description, school, tags, major } = body;
  const { years, terms, courses, details, colorscheme, requirements } = plan;
  const _id = uuidv1();

  const newTemplate = {
    _id,
    plan: { years, terms, courses, details, colorscheme, requirements },
    description, school, major, tags,
    stars: [],
    owner: event.jwt.email,
    lastUpdated: Date.now(),
  };

  validateTemplate(newTemplate);

  const result = await dynamoDb.put({
    TableName: TEMPLATES_TABLE,
    Item: newTemplate,
  }).promise();

  return { success: true };
}

async function list(event) {
  const result = await dynamoDb.scan({
    TableName: TEMPLATES_TABLE,
    ProjectionExpression:
      '#p.details.title, stars, #o, lastUpdated, school, major, tags, #id',
    ExpressionAttributeNames:{
        "#p": "plan",
        "#o": "owner",
        "#id": "_id",
    },
  }).promise();

  return result.Items;
}

async function tags(event) {
  // TODO one day this may be its own microservice
  return ['Example tag', 'ANOTHER_EXAMPLE', '1234'];
}

//TODO this should really be split into two functions to star or unstar
async function star(event) {
  const body = JSON.parse(event.body);

  const result = await dynamoDb.get({
    TableName: TEMPLATES_TABLE,
    Key: { _id: body._id },
  }).promise();

  const template = result.Item;

  if(!template) {
    throw new Error('Template ' + _id + ' not found');
  }

  const exists = template.stars.some(star => star === event.jwt.email);

  //Toggle. If the user starred, unstar. etc etc. This is a bad idea
  const newStars = exists ?
    template.stars.filter(u => u !== event.jwt.email) :
    template.stars.concat(event.jwt.email);

  await dynamoDb.put({
    TableName: TEMPLATES_TABLE,
    Item: {
      ...template,
      stars: newStars,
    }
  }).promise();

  return newStars;
}

async function get(event) {
  const _id = event.pathParameters._id;

  const result = await dynamoDb.get({
    TableName: TEMPLATES_TABLE,
    Key: { _id },
  }).promise();

  const template = result.Item;

  if(!template) {
    throw new Error('Template not found');
  }

  return template;
}
