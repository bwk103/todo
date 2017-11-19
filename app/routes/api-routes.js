'use strict'

var express = require('express');
var router = express.Router();
var db = require('../models');
var helpers = require('../helpers/routeHelpers')

router.route('/')
.get(helpers.getAllTodos)
.post(helpers.createNewTodo)

router.route('/:todo_id')
.get(helpers.getOneTodo)
.put(helpers.updateOneTodo)
.delete(helpers.deleteOneTodo)

module.exports = router;
