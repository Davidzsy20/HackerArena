import React from 'react';
import './Styles/TestSuite.css';

const TestSuite = props => {
    return(
      <div id="testSuite">
        <div> PROBLEM TITLE{this.props.problem.title} </div>
        <div id="description"> PROBLEM DESCRIPTION {this.props.problem.description}</div>
        <div> TESTS + TESTS PASSED {this.props.room.user.passedTests}</div>
      </div>
    )
}


export default TestSuite;