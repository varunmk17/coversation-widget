var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var watson = require('watson-developer-cloud');
var config = require('../config');

router.use(bodyparser.urlencoded({extended: false}));
router.use(bodyparser.json());

var conversation = watson.conversation({
    username: config.watsonConfig.username,
    password: config.watsonConfig.password,
    version: config.watsonConfig.version,
    version_date: config.watsonConfig.versionDate
});

router.get('/', function(req, res) {
    res.status(200).send('<div>CHIA Service</div>');
});

router.post('/', function(req, res) {
   
    var newMessage = req.body.newMessage;
    console.log(newMessage);
    conversation.message({
        workspace_id: config.watsonConfig.workspaceId,
        input: {'text': newMessage}
    },  function(err, response) {
            console.log(response.output.text[0]);
            if (err) 
                res.status(503).send({response:'Service Unavailable'});
            else
                res.status(200).send(
                    {response: response.output.text[0]});
    });
});

module.exports = router;