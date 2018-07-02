import initialState from './initialState';
import * as actionTypes from '../actions/actionTypes';


export default (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.FETCH_DATA: {
      const {questionnaire} = action
      return {
        ...state,
        questionnaire
      };
    }
    case actionTypes.SELECT_ANSWER: {
      return {
        ...state,
        selectedAnswers: { ...state.selectedAnswers, [action.question]: action.answers }
      };
    }
  }
  return state
}
