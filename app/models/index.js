var mongoose = require('mongoose');
var config = require('../../config');

mongoose.connection.openUri(`mongodb://${config.db.host}/${config.db.name}`)

mongoose.Promise = Promise;

module.exports.Todo = require('./todo.model');
