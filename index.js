let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
const PORT = process.env.PORT || 3002;
let path = require('path');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// get reference to the client build directory
const staticFiles = express.static(path.join(__dirname, '/quiz_app/dist'));
console.log(path.join(__dirname, './quiz_app/dist/index.html'));

// pass the static files (react app) to the express app. 
app.use(staticFiles);

//app.use('/*', staticFiles)

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '/quiz_app/dist/index.html'));
  console.log(__dirname)
});

// allow cross domain connection
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("ETag", "*");
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

require('./quiz_app_server/rest/questionnaire.js')(router);

app.set('port', (process.env.PORT || 3002))

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`server started port: ${PORT}`);
    }
});