
function getTodos(){
  $.getJSON('http://localhost:3000/api/todos')
  .then(data => data.map(createListItem))
  .then(todos => todos.forEach(addToList))
  .catch(function(err){
    throw err;
  })
}

function createToDo(text){
  $.post('http://localhost:3000/api/todos/', {name: text})
  .then(data => createListItem(data))
  .then(todo => addToList(todo))
  .then(clearInput)
  .catch(function(err){
    throw err;
  })
}

function updateToDo(todo){
  $.ajax({
    url: `http://localhost:3000/api/todos/${todo.data('id')}`,
    method: 'PUT',
    data: {isDone: !todo.data('isDone')}
  })
  .then(toggleIsDone(todo))
  .catch(function(err){
    throw(err)
  })
}

function deleteToDo(todo){
  $.ajax({
    url: 'http://localhost:3000/api/todos/' + todo.data('id'),
    method: 'DELETE'
  })
  .then(confirmation => console.log(confirmation))
  .then(deleteFromDOM(todo))
  .catch(function(err){
    throw err;
  })
}

function createListItem(todo){
  var listItem =  $(`<li>${todo.name}<span><i class="fa fa-trash-o" aria-hidden="true"></i></span></li>`);
  listItem.data('id', todo._id);
  listItem.data('isDone', todo.isDone);
  if(todo.isDone){
    listItem.addClass("done");
  };
  return listItem;
}

function addToList(todo){
  $('ul').append(todo);
}

function toggleIsDone(todo){
  todo.toggleClass("done");
  todo.data('isDone', !todo.data('isDone'));
}

function deleteFromDOM(todo){
  todo.remove();
}

function clearInput(){
  $('input').val('');
}
