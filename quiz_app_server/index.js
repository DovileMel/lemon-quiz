let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');

// allow cross domain connection
//app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//connect routes to application
// const routes = require('./routes');

// allow cross domain connection
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("ETag", "*");
    res.header("Cache-Control", "*");
    res.header("Content-Location", "*");
    res.header("Date", "*");
    res.header("Expires", "*");
    res.header("Vary", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    next();
});


app.use('/api', router);

require('./rest/questionnaire.rest.js')(router);

app.listen(3002, function(){
    console.log('App listening on port 3002');
});