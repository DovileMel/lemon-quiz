import * as actionTypes from './actionTypes';

export const getDataArr = () => (dispatch) => {
  fetch('http://localhost:3002/api/questionnaire', {
    method: 'GET'
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: actionTypes.FETCH_DATA,
        questionnaire: data,
      });
      return Promise.resolve(data);
    })
    .catch((error) => {
      throw new Error(error);
    });
}

export const selectAnswer = (question, answers) => {
  return {
    type: actionTypes.SELECT_ANSWER,
    question,
    answers
  }
}

export const submitUserAnswers = (userInfo, userAnswers) => (dispatch) => {
  const submittedData = {
    user_data: userInfo,
    questionnaire: {
      answered: true,
      questions: userAnswers
    }
  }

  fetch("http://localhost:3002/api/questionnaire",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(submittedData)
    })
    .then(res => res.json())
    .then((data) => {
      dispatch({
        type: actionTypes.GET_USER_DATA,
        userInfo,
        result: data
      });
      return Promise.resolve(data);
    })
    .catch((error) => {
      throw new Error(error);
    });


}





