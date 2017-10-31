var db = require('../models');


exports.getAllTodos = function (req, res){
  db.Todo.find()
  .then(function(todos){
    res.status(200);
    res.json(todos);
  })
  .catch(function(err){
    throw(err)
  })
};

exports.createNewTodo = function(req, res){
  db.Todo.create(req.body)
  .then(function(newTodo){
    res.status(201);
    res.json(newTodo);
  })
  .catch(function(err){
    throw(err);
  })
}

exports.getOneTodo = function(req, res){
  db.Todo.findById(req.params.todo_id)
  .then(function(todo){
    res.json(todo);
  })
  .catch(function(err){
    throw(err);
  });
}

exports.updateOneTodo = function(req, res){
  db.Todo.findByIdAndUpdate(req.params.todo_id, req.body, {new: true})
  .then(function(updatedTodo){
    res.json(updatedTodo);
  })
  .catch(function(err){
    throw(err);
  })
}

exports.deleteOneTodo = function(req, res){
  db.Todo.findByIdAndRemove(req.params.todo_id)
  .then(function(){
    res.json({message: 'The todo has been successfully deleted'});
  })
  .catch(function(err){
    throw(err)
  })
}
