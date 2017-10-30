var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/', (req, res)=> {
  db.Todo.find()
  .then(function(todos){
    res.status(200);
    res.json(todos);
  })
  .catch(function(err){
    throw(err)
  })
});

router.post('/', (req, res)=> {
  db.Todo.create(req.body)
  .then(function(newTodo){
    res.status(201);
    res.json(newTodo);
  })
  .catch(function(err){
    throw(err);
  })
})

module.exports = router;
