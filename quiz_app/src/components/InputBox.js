import React from "react";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import * as actions from '../actions/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  textField: {
    width: 200,
    display: block
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  }
});

class InputBox extends React.PureComponent {

  state = {
    [this.props.inputName]: '',
    error: false
  }

  validateInput = (fieldName, input) => {
    let validationSuccess = false;

    //validate name field value
    if (fieldName.includes("name")) {
      if (/^[A-Za-z ]+$/.test(input)) {
        validationSuccess = true
        this.setState({
          error: false
        })
      } else {
        validationSuccess = false
        this.setState({
          error: true
        })
      }
    }

    //validate email field value
    if (fieldName.includes("email")) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (re.test(input.toLowerCase())) {
        validationSuccess = true
        this.setState({
          error: false
        })
      } else {
        validationSuccess = false
        this.setState({
          error: true
        })
      }
    }
    return validationSuccess
  }

  handleChange = event => {
    //set input value to the state
    const value = event.target.value;
    const { inputName } = this.props;
    this.setState({
      [inputName]: value
    })

    //validate inputs. If validation is successful - send input value to UserDataContainer
    const validationResult = this.validateInput(inputName, value);
    if (validationResult) {
      this.props.updateInputValue(inputName, value)
    } else {
      console.log("error")
    }
  };

  render() {
    return (
      <div className="user-data-box">
        <FormControl className={styles.formControl} required error={this.state.error} aria-describedby="input">
          <InputLabel>{this.props.inputLabel}</InputLabel>
          <Input id="input-text" value={this.state[this.props.inputName]} onChange={this.handleChange} />
          {this.state.error && <FormHelperText id="error-text">{"Please check your " + this.props.inputName}</FormHelperText>}
        </FormControl>
      </div>
    );
  }
}

InputBox.propTypes = {
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
)(InputBox);



