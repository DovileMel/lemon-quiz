import React from "react";
import '../styles/style.scss';
import * as actions from '../actions/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Question from './Question';
import UserDataContainer from './UserDataContainer';
import ResultContainer from './ResultContainer';
import MetaTags from 'react-meta-tags';

class App extends React.PureComponent {

  componentDidMount = () => {
    //fetch questionnaire from the server
    const { actions } = this.props;
    actions.getDataArr();
  }

  render() {
    return (
      <div className="wrapper">
        <MetaTags>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </MetaTags>
        <div className="content">
          <header>
            <h1>Welcome to the Quiz!</h1>
            <h2>Answer these simple questions and get the results</h2>
          </header>
          <main>
            {this.props.questionnaire && this.props.questionnaire[0].questions.map((quest, index) => <Question question_data={quest} key={index} />)
            }
            <UserDataContainer />
            {this.props.result && <ResultContainer resultData={this.props.result} />}
          </main>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object,
  questionnaire: PropTypes.arrayOf(PropTypes.object),
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
  mapDispatchToProps
)(App);



