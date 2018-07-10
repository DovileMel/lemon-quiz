import React from "react";
import * as actions from '../actions/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';

class Question extends React.PureComponent {

  state = {
    value: [],
    allAnswers: [],
    multipleCorrectAnswer: false,
    checkedBox: []
  };

  componentDidMount = () => {
    //make array of all possible answers KEYS
    const answersArrByKeys = this.props.question_data.possible_answers.map(answ => String(Object.keys(answ)));
    //make array of all possible answers VALUES
    const answersArrByValues = this.props.question_data.possible_answers.map(value => String(Object.values(value)))

    //check if question has more that one correct answer
    const correctAnswers = answersArrByValues.filter(correct => correct === 'true').length;
    const multipleCorrectAns = correctAnswers > 1 ? true : false;
    this.setState(
      {
        allAnswers: answersArrByKeys,
        multipleCorrectAnswer: multipleCorrectAns
      })
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.state;
    if (prevState.value !== value) {
      const { actions } = this.props;
      actions.selectAnswer(this.props.question_data.question, this.state.value);
    }
  }

  handleChange = event => {
    const selectedValue = event.target.value;

    //check if answer checkbox is already selected
    if (this.state.checkedBox[selectedValue] === true) {
      const filteredSelectedResults = this.state.value.filter(results => results !== selectedValue);
      this.setState({
        value: filteredSelectedResults,
        checkedBox: { ...this.state.checkedBox, [selectedValue]: !this.state.checkedBox[selectedValue] }
      })
    } else {
      //check if radio button or checkbox is selected
      this.state.multipleCorrectAnswer ?
        this.setState({
          value: [...this.state.value, selectedValue],
          checkedBox: { ...this.state.checkedBox, [selectedValue]: !this.state.checkedBox[selectedValue] }
        })
        :
        this.setState({
          value: selectedValue
        })
    }
  };

  //set className of the question depending on whether it was answered correcly or not
  getQuestion = (quest) => {
    if (this.props.result) {
      const allCorrectlyAnsweredQ = this.props.result.correctlyAnsweredQuestions.filter(q => q === quest);
      if (allCorrectlyAnsweredQ.length) {
        return "correct-question"
      } else {
        return "incorrect-question"
      }
    }
  }

  //render the possible answer;
  // after submitting results, it is displayed whether answer was correct or not by adding a className
  findAnswer = (ans) => {
    const findQuestionByKey = this.props.question_data.possible_answers.filter(answ => String(Object.keys(answ)) === ans);
    const answerValue = String(Object.values(findQuestionByKey[0]));
    return (
      <React.Fragment>
        {this.props.result ?
          <span className={`answer ${answerValue === 'true' ? 'correct-answer' : 'incorrect-answer'}`}>
            {ans}
          </span>
          :
          <span> {ans} </span>
        }
      </React.Fragment>
    );
  }

  render() {
    const { question_data } = this.props;
    return (
      <div className="question_box">
        <FormControl>
          <FormLabel ><span className={this.getQuestion(question_data.question)}>{String(question_data.question)}</span></FormLabel>
          {this.state.multipleCorrectAnswer ?
            <FormGroup value={String(this.state.value)} >
              {this.state.allAnswers.map(choice =>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={this.handleChange}
                      value={choice}
                      key={choice}
                      color="primary"

                    />
                  }
                  label={this.findAnswer(choice)}
                  key={choice}
                />
              )}
            </FormGroup>
            :
            <RadioGroup value={String(this.state.value)} onChange={this.handleChange}>
              {this.state.allAnswers.map(choice =>
                <FormControlLabel value={choice}
                  control={<Radio color="primary" />}
                  label={this.findAnswer(choice)}
                  key={choice}

                />
              )
              }
            </RadioGroup>
          }
        </FormControl>
      </div>
    );
  }
}

Question.propTypes = {
  actions: PropTypes.object,
  question_data: PropTypes.shape({
    possible_answers: PropTypes.array,
    question: PropTypes.string,
  }),
  result: PropTypes.shape({
    correctlyAnsweredQuestions: PropTypes.array
  }),

};

const stateToProps = ({ mainRd }) => ({
  ...mainRd
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}
export default connect(
  stateToProps,
  mapDispatchToProps
)(Question);



