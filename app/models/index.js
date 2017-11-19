'use strict'

const mongoose = require('mongoose');
const config = require('../../config');

const db = {
  host: 'localhost',
  port: 27017,
  name: config.isTest ? 'todolistapplication_test' : 'todolistapplication'
}

mongoose.connection.openUri(`mongodb://${db.host}/${db.name}`)

mongoose.Promise = Promise;

module.exports.Todo = require('./todo.model');
