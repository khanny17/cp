'use strict';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'POST, GET, PUT, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
};

// Helper so we just throw errors or return what we want
function handleErrors(fn) {
  return async (event, context) => {
    try {
      const data = await fn(event, context);
      return {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify(data),
      };
    }
    catch(error) {
      return {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify({ message: error.message }),
      };
    }
  }
}

// Add new filepaths to this array
['auth', 'plans', 'preferences', 'templates']
  .forEach(name => module.exports[name] = handleErrors(require('./'+name)));
