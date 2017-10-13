import ReactAce from 'react-ace-editor';
import React from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import runTestsOnUserAnswer from '../ToyProblemTesting/testUserAnswer';
import fire from '../Firebase/firebase';
import db from '../Firebase/db';
import Disruptions from './Disruptions/disruptions';
import updateTestSuite from '../Actions/updateTestSuite';

import '../Styles/CodeEditor.css';
 


class CodeEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      testStatus: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear =  this.handleClear.bind(this);
    this.liveInputs = this.liveInputs.bind(this);
    this.sendDisruptions = this.sendDisruptions.bind(this);
    this.receiveDisruptions = this.receiveDisruptions.bind(this);
  }

  componentDidMount(){
    // const editor = this.ace.editor;
    // editor.setTheme("ace/theme/monokai");
    // editor.getSession().setMode("ace/mode/javascript");
  }

  // NEEDS TO TAKE INPUT CODE OF EDITOR,
  // UTILIZE ROOM.PROBLEM.TESTCASES TO GRAB TEST RESULTS
  // SET TEST RESULTS IN ROOM DATABASE 
  
  liveInputs(){
    let liveInput = this.ace.editor.getValue();
    if(fire.auth().currentUser === this.props.currentRoom.creator) {
      fire.database().ref('rooms/' + this.props.currentRoom.Key).set({creatorLiveInput : liveInput})
    } else {
      fire.database().ref('rooms/' + this.props.currentRoom.Key).set({challengerLiveInput : liveInput})
    }
  }

  sendDisruptions(){
    let func = prompt("What do you want to send?")
    let challengerDisruptions = this.props.currentRoom.challengerDisruptions.push(func);
    let creatorDisruptions = this.props.currentRoom.creatorDisruptions.push(func);
    if(fire.auth().currentUser === this.props.currentRoom.creator) {
      fire.database().ref('rooms/' + this.props.currentRoom.Key).set({challengerDisruptions: challengerDisruptions})
    } else {
      fire.database().ref('rooms/' + this.props.currentRoom.Key).set({creatorDisruptions : creatorDisruptions})
    }
  }

  receiveDisruptions(func){
    Disruptions[func](this.ace.editor);
  }

  handleSubmit(){
    this.receiveDisruptions('Wipe');
    this.receiveDisruptions('Fog');
    let code = this.ace.editor.getValue();
    //TEST SUITE LOGIC
    // place here
    // testStatus object// actual,expected,passed,inputs
    // this.setState({testStatus: runTestsOnUserAnswer(code,this.props.testCases)});
    
    let testStatus =  runTestsOnUserAnswer((code),this.props.currentRoom.problem.tests, this.props.currentRoom.problem.userFn)
  
    if(fire.auth().currentUser === this.props.currentRoom.creator) {
      fire.database().ref('rooms/' + this.props.currentRoom.Key).set({creatorTestStatus : testStatus})
    } else {
      fire.database().ref('rooms/' + this.props.currentRoom.Key).set({challengerTestStatus : testStatus})
    }
    

    // ACE CONSOLE
    // Function to handle console.logs in the aceConsole


    let newLog = function(...theArgs){
      let results = "";
      let args = [].slice.call(arguments);
      args.forEach( argument => {
      // eslint-disable-next-line  
        results += eval("'" + argument + "'");
      })
      $('#aceConsole').append(`<li id="log">${results}</li>`);
    }

    let consoleLogChange = "let console = {}\nconsole.log=" + newLog + "\n";
    let newCode = consoleLogChange + code;

      // eslint-disable-next-line
    try {
      console.log(eval(code));
      if(eval(code)){
          $('#aceConsole').append(`<li>${eval(newCode)}</li>`);
      } else {
        $('#aceConsole').append(`<li>undefined</li>`);
      }
    }  catch(e) {
      $('#aceConsole').append(`<li>undefined</li>`);
    }
  }
  
  handleClear(){
    $('#aceConsole').empty();
  }

  render() {
    return (
      <div id="editorSide">
          <ReactAce
            mode="javascript"
            theme="monokai"
            onChange={this.liveInputs}
            style={{ height: '400px', width: '50vw' }}
            ref={instance => { this.ace = instance; }} // Let's put things into scope
          />
        <button onClick={this.handleSubmit}> SUBMIT </button>
        <ul id="aceConsole"></ul>
        <button onClick={this.handleClear}> CLEAR CONSOLE </button>
        <button onClick={this.sendDisruptions}> SEND Disruptions </button>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   console.log('mapped state to props', state);
//   return ({
//     // ROOM DATA? 
//     // room.testData
//     // tests: state.gameRooms.testCases
//   })
// }

// const mapDispatchToProps = (dispatch) => ({
//   updateTestSuite: () => dispatch(updateTestSuite(this.state.testStatus))
// })

export default CodeEditor;