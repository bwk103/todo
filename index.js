var express = require('express'),
    app = express(),
    path = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(path, () => {
    console.log(`The server is running on path ${path}.`);
})
