const bcrypt = require('bcrypt');
const jwt_auth = require('./jwt-auth');
const jwt = require('jsonwebtoken');
const request = require('request-promise-native');
const AWS = require('aws-sdk');

const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: process.env.SERVERLESS_REGION
});

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


module.exports = async function(event, context) {
  return jwt_auth(process.env.JWT_SECRET, ['/register', '/login'])
    (async(event, context) => {
      const url = event.path;
      const body = JSON.parse(event.body);
      switch(url) {
        case '/register': return await register(body);
        case '/login'   : return await login(body);
        default: return `Recognized as ${event.jwt.email}`;
      }
    })(event, context);
}

async function register(body) {
  //Validate captcha first
  const captcha_url = 'https://www.google.com/recaptcha/api/siteverify' +
    '?secret=' + process.env.CAPTCHA_SECRET_KEY +
    '&response=' + body['g-recaptcha-response'];

  const captcha_response = await request({
      method: 'POST',
      uri: captcha_url,
      json: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
  });

  if(!captcha_response.success) {
    throw new Error('reCAPTCHA check failed');
  }

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
