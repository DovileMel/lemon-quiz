import React from "react";
import * as actions from '../actions/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputBox from './InputBox';
import Button from '@material-ui/core/Button';

class UserDataContainer extends React.PureComponent {

  state = {
    userInfo: [],
    notCompleted: true,
  }

  handleUserData = (field, value) => {
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        [field]: value
      },
    })
  }

  handleSubmit = () => {
    const { actions } = this.props;
    actions.submitUserAnswers(this.state.userInfo, this.props.selectedAnswers)
  }

  componentDidUpdate(prevProps, prevState) {
    const { userInfo } = this.state;
    const { result } = this.props;
    if (prevProps.result !== result && prevProps.result !== result) {
      this.setState({
        notCompleted: true,
      })
    }
    if (prevState.userInfo !== userInfo) {
      const checkRequiredData = Object.keys(userInfo).length;
      if (checkRequiredData > 1) {
        this.setState({
          notCompleted: false
        })
      }
    }

  }

  render() {
    return (
      <div className="user-data">
        <div className="input-fields">
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
        </div>
        {this.props.selectedAnswers &&
          <Button variant="contained"
            disabled={this.state.notCompleted}
            color="primary"
            onClick={this.handleSubmit}>
            Submit
      </Button>
        }
        {this.props.userData !== null &&
          <h3>Thank you for your answers!</h3>
        }
      </div>
    );
  }
}

UserDataContainer.propTypes = {
  actions: PropTypes.object,
  userData: PropTypes.object,
  selectedAnswers: PropTypes.object,
  result: PropTypes.object
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



