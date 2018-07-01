let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let router = express.Router();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//connect routes to application
// const routes = require('./routes');



// allow cross domain connection
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use('/api', router);

require('./rest/questionnaire.rest.js')(router);

app.listen(3002, function(){
    console.log('App listening on port 3002');
});