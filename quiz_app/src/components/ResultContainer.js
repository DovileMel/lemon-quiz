import React from "react";
import PropTypes from 'prop-types';

const ResultContainer = (props) => (
  <div className="result-box">
    <h2>Correct answers: {props.resultData.result}</h2>
    <h2>Your ranking: {props.resultData.ranking}</h2>
  </div>
);


ResultContainer.propTypes = {
  resultData: PropTypes.shape({
    result: PropTypes.number,
    ranking: PropTypes.number
  }),
};

export default ResultContainer;
