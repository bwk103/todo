'use strict'

$(document).ready(function(){

  //Retrieve all todos:
  getTodos()

  //Add new todo
  $('input').on('keypress', function(e){
    if (e.which === 13){
      createToDo($(this).val())
    }
  })

  //Update todo
  $('ul').on('click', 'li', function(){
    updateToDo($(this));
  })


  //Delete todo
  $('ul').on('click', 'span', function(e){
    e.stopPropagation();
    var todo = $(this).parent();
    deleteToDo($(todo));
  });
})
