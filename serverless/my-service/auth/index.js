const bcrypt = require('bcrypt');
const jwt_auth = require('../util/jwt-auth');
const jwt = require('jsonwebtoken');
const request = require('request-promise-native');
const verifyCaptcha = require('../util/captcha');
const emailRegex = require('../util/email');

const AWS = require('aws-sdk');
const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: process.env.SERVERLESS_REGION
});



module.exports = jwt_auth(process.env.JWT_SECRET, ['/auth/register', '/auth/login'])
(async(event, context) => {
  const action = event.pathParameters.action;
  const body = JSON.parse(event.body);

  switch(action) {
    case 'register': return await register(body);
    case 'login'   : return await login(body);
    default: return `Recognized as ${event.jwt.email}`;
  }
});


async function register(body) {
  //Validate captcha first
  const captcha_url = 'https://www.google.com/recaptcha/api/siteverify' +
    '?secret=' + process.env.CAPTCHA_SECRET_KEY +
    '&response=' + body['g-recaptcha-response'];

  const captchaResponse = body['g-recaptcha-response'];
  await verifyCaptcha(captchaResponse);

  // Next, check email validity
  if(!emailRegex.test(body.email)) {
    throw new Error('Invalid email');
  }

  // Next, check if email already taken
  const existingResult = await dynamoDb.get({
    TableName: USERS_TABLE,
    Key: {
      email: body.email
    }
  }).promise();

  if(existingResult.Item) {
    throw new Error('User Already Exists');
  }

  const hashed_pass = await bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(body.password, salt));

  await dynamoDb.put({ TableName: USERS_TABLE, Item: {
    email: body.email,
    password: hashed_pass,
    name: body.name,
  }}).promise();

  return login(body);
}

async function login(body) {
  const result = await dynamoDb.get({
    TableName: USERS_TABLE,
    Key: {
      email: body.email
    }
  }).promise();

  const user = result.Item;

  if(!user) {
    throw new Error('User not found');
  }

  if(!bcrypt.compareSync(body.password, user.password)) {
    throw new Error('Incorrect Password');
  }

  const { password, ...payload } = user;

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return {
    jwt: token,
    user: { ...payload },
  };
}
