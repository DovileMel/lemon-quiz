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

export const getUser = (userInfo) => {
  console.log(userInfo)
  return {
    type: actionTypes.GET_USER_DATA,
    userInfo
  }
}





