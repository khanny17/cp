const jwt_auth = require('../util/jwt-auth');

const AWS = require('aws-sdk');
const PREFERENCES_TABLE = process.env.PREFERENCES_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: process.env.SERVERLESS_REGION
});



module.exports = jwt_auth(process.env.JWT_SECRET)
(async(event, res) => {
  if(!event.pathParameters) {
    return 'Preferences API Root';
  }

  const action = event.pathParameters.action;

  switch(action) {
    case 'get': return await get(event);
    case 'set': return await set(event);
    default: return `Preferences API Root`;
  }
});

async function get(event) {
  const result = await dynamoDb.get({
    TableName: PREFERENCES_TABLE,
    Key: { user: event.jwt.email },
  }).promise();

  return result.Item || {};
}

async function set(event) {
  const body = JSON.parse(event.body);
  const { school } = body;

  const result = await dynamoDb.get({
    TableName: PREFERENCES_TABLE,
    Key: { user: event.jwt.email },
  }).promise();

  const origPrefs = result.Item || {};
  const newPrefs = {
    ...origPrefs,
    school,
    user: event.jwt.email,
  };

  const result2 = await dynamoDb.put({
    TableName: PREFERENCES_TABLE,
    Item: newPrefs,
  }).promise();

  return newPrefs;
}
