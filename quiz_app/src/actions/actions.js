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
const ara = Object.assign({}, {[question]: answers})
  return {
    type: actionTypes.SELECT_ANSWER,
    //updatedAnswer: {[question]: answer}
    question,
    answers
  }
}



