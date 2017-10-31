
var express = require('express'),
    app = express(),
    config = require('./config');
    todoRoutes = require('./app/routes/api-routes'),
    bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/app/views'));
app.use(express.static(__dirname + '/app/public'));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.use('/api/todos', todoRoutes)

app.listen(config.app.port, () => {
    console.log(`The server is running on port ${config.app.port} and is connected to ${config.db.name}`);
})

module.exports = app;
