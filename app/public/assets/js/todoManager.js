// $(document).ready(function(){
//   $.getJSON('http://localhost:3000/api/todos')
//   .then(function(data){
//     return data.map(createListItem);
//   })
//   .then(function(todos){
//     todos.forEach(addToList);
//   });
// })

function fetchTodos(){
  $.getJSON('http://localhost:3000/api/todos')
  .then(someFunction)
}

function someFunction(){
  
}

function createListItem(todo){
  return `<li>${todo.name}</li>`;
}

function addToList(li){
  $('ul').append(li);
}

module.exports = {
  fetchTodos,
  createListItem,
  addToList
};
