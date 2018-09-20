'use strict'

const jwt = require('jsonwebtoken')

module.exports = exports = (secret, whitelist, config = {}) => (fn) => {

    if (!secret) {
        throw Error('jwt-auth must be initialized passing a secret to decode incoming JWT token')
    }

    if (!Array.isArray(whitelist)) {
        config = whitelist || {}
    }

    return (event, context) => {
        const bearerToken = event.headers.Authorization
        const pathname = event.path
        const whitelisted = Array.isArray(whitelist) && whitelist.indexOf(pathname) >= 0

        if (!bearerToken && !whitelisted) {
            return {
              statusCode: 401,
              body: JSON.stringify({
                message: config.resAuthMissing || 'missing Authorization header',
                input: event,
              }),
            };
        }

        try {
            const token = bearerToken.replace('Bearer ', '')
            event.jwt = jwt.verify(token, secret)
        } catch(err) {
            if (!whitelisted) {
              return {
                statusCode: 401,
                body: JSON.stringify({
                  message: config.resAuthInvalid || 'invalid token in Authorization header',
                  input: event,
                }),
              };
            }
        }

        return fn(event, context)
    }
}

