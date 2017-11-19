'use strict'

const joi = require('joi')

const envVarsSchema = joi.object({
  NODE_ENV: joi.string().allow(['development', 'test', 'production']).default('development'),
  PORT: joi.number().integer().min(0).max(65535).default(3000)
}).unknown()

const { error, value:envVars } = joi.validate(process.env, envVarsSchema)

if (error) {
  throw new Error (`Config validation error: ${error.message}`)
}

const config = {
  env: envVars.NODE_ENV,
  isTest: envVars.NODE_ENV === 'test',
  isDevelopment: envVars.NODE_ENV === 'development',
  server: {
    port: envVars.PORT
  },
  db: {
    host: 'localhost',
    port: 27017,
    name: 'todolistapplication'
  }
}

module.exports = config
