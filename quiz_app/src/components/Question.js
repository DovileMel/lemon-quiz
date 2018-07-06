import React from "react";
import '../styles/style.scss';
import { withStyles } from '@material-ui/core/styles';
import * as actions from '../actions/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
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

    if (this.state.checkedBox[selectedValue] === true) {
      const filteredSelectedResults = this.state.value.filter(results => results !== selectedValue);
      console.log(filteredSelectedResults)
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

  render() {
    const { question_data } = this.props;
    return (
      <div className="question_box">
        <FormControl>
          <FormLabel >{String(question_data.question)}</FormLabel>
          {this.state.multipleCorrectAnswer ?
            <FormGroup value={String(this.state.value)} >
              {this.state.allAnswers.map(choice =>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={this.handleChange}
                      value={choice}
                      key={choice}
                    />
                  }
                  label={choice}
                />
              )}
            </FormGroup>
            :
            <RadioGroup value={String(this.state.value)} onChange={this.handleChange}>
              {this.state.allAnswers.map(choice =>
                <FormControlLabel value={choice}
                  control={<Radio />}
                  label={choice}
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
  children: PropTypes.element
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



