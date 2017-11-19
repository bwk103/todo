'use strict'
const express = require('express');
const app = express();
const config = require('./config');
const todoRoutes = require('./app/routes/api-routes');
const bodyParser = require('body-parser');
const db = require('./app/models');
const DB_NAME = db.Todo.db.name;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/app/views'));
app.use(express.static(__dirname + '/app/public'));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.use('/api/todos', todoRoutes)



var server = app.listen(config.server.port, () => {
    console.log(`The server is running on port ${config.server.port} and is connected to ${DB_NAME}`);
})

module.exports = server;
