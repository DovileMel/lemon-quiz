const fs = require('fs');
const questionnaire_data = 'data/questionnaire.txt';
const users_data = 'data/users_answers.txt';
const getResult = require('../calculations/calculations.js');

function getRanking(body) {
    let all_users_answers = JSON.parse(fs.readFileSync(users_data));
    let rankingResult = null;
    const userRanking = body.result;
    const allUsersResult = all_users_answers.map(res => res.result);
    const sortedResults = allUsersResult.sort().reverse();
    const ranking = sortedResults.indexOf(userRanking);
    const maxResult = Math.max(...sortedResults);
    if (ranking === -1) {
        if (userRanking > maxResult) {
            rankingResult = 1;
        } else {
            rankingResult = sortedResults.length
        }
    } else {
        rankingResult = ranking + 1
    }
    return Object.assign({}, body, { ranking: rankingResult });
}

function calc(body, ranking, addUser) {
    const questionnaire = JSON.parse(fs.readFileSync(questionnaire_data));
    const calculatedResults = getResult.calculateResult(body, questionnaire);
    const addResults = Object.assign({}, body, calculatedResults);
    const rankingRes = ranking(addResults);
    console.log(addUser(addResults));
    return rankingRes;
}

function addUserData(body) {

    let all_users_data = JSON.parse(fs.readFileSync(users_data));
    all_users_data.push(body);
    let file = fs.createWriteStream(users_data);
    file.write(JSON.stringify(all_users_data));
    file.end();
    return "results are stored"
}

module.exports = function (router) {

    router.route('/questionnaire/')

        .get(function (req, res) {
            console.log('get questionnaire')
            res.status(200).json(JSON.parse(fs.readFileSync(questionnaire_data)));
        })

        .post(function (req, res) {
            console.log('questionnaire submitted');
            res.status(200).json(calc(req.body, getRanking, addUserData));
        })

}