var mongoose = require('mongoose'),
    schema = mongoose.Schema;

var todoSchema = new schema({
    name: { type: String, required: true },
    isDone: { type: Boolean, required: true, default: false },
    dateCreated: { type: Date, required: true, default: Date.now }
});

var todo = mongoose.model('Todo', todoSchema);

module.exports = todo;
