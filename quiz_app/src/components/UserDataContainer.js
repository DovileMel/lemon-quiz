import React from "react";
import { withStyles } from '@material-ui/core/styles';
import * as actions from '../actions/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import InputBox from './InputBox';
import Button from '@material-ui/core/Button';

class UserDataContainer extends React.PureComponent {

  state = {
    userInfo: [],
    isNotCompleted: true
  }

  handleUserData = (field, value) => {
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        [field]: value
      },
    })
  }

  handleSubmit = (event) => {
    const { actions } = this.props;
    actions.getUser(this.state.userInfo)
  }

  componentDidUpdate(prevProps, prevState) {
    const { userInfo } = this.state;
    if (prevState.userInfo !== userInfo) {
      const checkRequiredData = Object.keys(this.state.userInfo).length;
      if (checkRequiredData > 1) {
        this.setState({
          isNotCompleted: false
        })
      }
    }
  }

  render() {
    return (
      <div className="user-data-box">
        <InputBox
          isRequired={true}
          inputName="name"
          inputLabel="Your name"
          updateInputValue={this.handleUserData}
        />
        <InputBox
          isRequired={true}
          inputName="email"
          inputLabel="Your email address"
          updateInputValue={this.handleUserData}
        />
        <Button variant="contained" disabled={this.state.isNotCompleted} color="primary" onClick={this.handleSubmit}>
          Submit
      </Button>
      {this.props.userData !== null &&
          <h3>Thank you for your answers!</h3>
      }
      </div>
    );
  }
}

UserDataContainer.propTypes = {
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
  mapDispatchToProps)(UserDataContainer);



