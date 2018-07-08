const fs = require('fs');
const questionnaire_data = 'data/questionnaire.txt';
const users_data = 'data/users_answers.txt';
const getResult = require('../calculations/calculations.js');

function addUserData(body) {
    let all_users_data = JSON.parse(fs.readFileSync(users_data));
    all_users_data.push(body);
    let file = fs.createWriteStream(users_data);
    file.write(JSON.stringify(all_users_data));
    file.end();
    return getResult.calculateResult(body, JSON.parse(fs.readFileSync(questionnaire_data)) );
}


module.exports = function (router) {

    router.route('/questionnaire/')

        .get(function (req, res) {
            console.log('get questionnaire')
            res.status(200).json(JSON.parse(fs.readFileSync(questionnaire_data)));
        })

        .post(function (req, res) {
            console.log('questionnaire submitted');
            res.status(200).json(addUserData(req.body));
        })

}