import React from "react";
import '../styles/style.scss';
import { withStyles } from '@material-ui/core/styles';
import * as actions from '../actions/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Question from './Question';
import UserDataContainer from './UserDataContainer';

class App extends React.PureComponent {

  componentDidMount = () => {
    const { actions } = this.props;
    actions.getDataArr();
  }

  render() {
    return (
      <div className="content">
        <header>
          <h1>Welcome to the Quiz!</h1>
          <h2>Answer these simple questions and get the results</h2>
          </header>
          <main>
         {this.props.questionnaire && this.props.questionnaire[0].questions.map((quest, index) => <Question question_data={quest} key={index}/>)
         }
         <UserDataContainer/>
          </main>
      </div>
    );
  }
}

App.propTypes = {
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
)(App);



