import React from "react";
import PropTypes from 'prop-types';

const ResultContainer = (props) => (
  <div>
    <div>Correct answers: {props.resultData.result}</div>
    <div>Your ranking: {props.resultData.ranking}</div>
  </div>
);

export default ResultContainer;
