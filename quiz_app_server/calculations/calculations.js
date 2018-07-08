module.exports.calculateResult = (userData, questionnaire) => {
    let result = null;
    let correctlyAnsweredQuestions = [];

    //get array of all possible questions (question + possible answers)
    const questionsArray = questionnaire[0].questions.map(quest => quest);

    //get array of questions, answered by user
    const userAnsweredQuestions = Object.keys(userData.questionnaire.questions);

    // calculate how many questions were answered correctly
    userAnsweredQuestions.map(question => {

        //filter array of user answered questions out of all questions ; and array of possible answers
        const allQuest = questionsArray.filter(ans => ans.question === question);
        const poss_ans = allQuest[0].possible_answers;

        //filter array of all correct answers; extract only the keys
        const Quest = Object.values(poss_ans).filter(ans => String(Object.values(ans)) === 'true');
        const corrAnswersArray = Quest.map(ans => String(Object.keys(ans)));

        //check if there is more that one correct possible answers. If user result is correct, add 1
        if (corrAnswersArray.length === 1) {
            const userAnswer = userData.questionnaire.questions[question];
            if (String(corrAnswersArray) === userAnswer) {
                result += 1;
                correctlyAnsweredQuestions.push(question)
            }
        }
        else {
            let combinedResults = [];
            const userAnswers = Object.values(userData.questionnaire.questions[question]);
            compareResults = userAnswers.map(ans => {
                const answerIndex= corrAnswersArray.indexOf(ans);
                
                    combinedResults.push(answerIndex) 
                
            })

            checkCombinedResult = () => {
                return combinedResults.find(ans => ans === -1);
            }
            if (checkCombinedResult() !== -1 && corrAnswersArray.length === combinedResults.length) {
                result += 1;
                correctlyAnsweredQuestions.push(question)
            }
        }
    })
    return {result, correctlyAnsweredQuestions}
}