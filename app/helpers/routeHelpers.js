var db = require('../models');


getAllTodos = function (req, res){
  db.Todo.find()
  .then(function(todos){
    res.status(200);
    res.json(todos);
  })
  .catch(function(err){
    throw(err)
  })
};

createNewTodo = function(req, res){
  db.Todo.create(req.body)
  .then(function(newTodo){
    res.status(201);
    res.json(newTodo);
  })
  .catch(function(err){
    throw(err);
  })
}

getOneTodo = function(req, res){
  db.Todo.findById(req.params.todo_id)
  .then(function(todo){
    res.json(todo);
  })
  .catch(function(err){
    throw(err);
  });
}

updateOneTodo = function(req, res){
  db.Todo.findByIdAndUpdate(req.params.todo_id, req.body, {new: true})
  .then(function(updatedTodo){
    res.json(updatedTodo);
  })
  .catch(function(err){
    throw(err);
  })
}

deleteOneTodo = function(req, res){
  db.Todo.findByIdAndRemove(req.params.todo_id)
  .then(function(){
    res.json({message: 'The todo has been successfully deleted'});
  })
  .catch(function(err){
    throw(err)
  })
}

module.exports = {
  getAllTodos: getAllTodos,
  createNewTodo: createNewTodo,
  getOneTodo: getOneTodo,
  updateOneTodo: updateOneTodo,
  deleteOneTodo: deleteOneTodo
}
