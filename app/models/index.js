var mongoose = require('mongoose');
var config = require('../../config');

mongoose.connect(`mongodb://${config.db.host}/${config.db.name}`)

mongoose.Promise = Promise;

module.exports.Todo = require('./todo.model');
