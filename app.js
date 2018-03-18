var express = require('express');
var app = express();

var MessageHandleController = 
    require('./controllers/MessageHandleController');
app.use('/api/handle', MessageHandleController);

module.exports = app;

