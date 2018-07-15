let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
const PORT = process.env.PORT || 3002;
let path = require('path');

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// get reference to the client build directory
const staticFiles = express.static(path.join(__dirname, '/quiz_app/dist'));

// pass the static files (react app) to the express app. 
app.use(staticFiles);

// allow cross domain connection
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("ETag", "*");
    res.header("Content-Location", "*");
    res.header("Date", "*");
    res.header("Expires", "*");
    res.header("Vary", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    next();
});

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '/quiz_app/dist/index.html'));
    console.log(__dirname)
  });

app.use('/api', router);

require('./quiz_app_server/rest/questionnaire.js')(router);

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`server started port: ${PORT}`);
    }
});