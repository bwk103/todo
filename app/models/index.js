'use strict'

var mongoose = require('mongoose');
var config = require('../../config');

var db = {
  host: 'localhost',
  port: 27017,
  name: config.isTest ? 'todolistapplication_test' : 'todolistapplication'
}

mongoose.connection.openUri(`mongodb://${db.host}/${db.name}`)

mongoose.Promise = Promise;

module.exports.Todo = require('./todo.model');
