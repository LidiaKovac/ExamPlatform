import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styling/Start.scss";
import "../App.scss";
import {withRouter} from 'react-router-dom'
const uniqid = require('uniqid')

class Start extends React.Component {
  state = {
    candidateName: "",
  };
  handleForm = (e) => {
    this.setState({ candidateName: e.currentTarget.value }, () =>
      console.log(this.state.candidateName)
    );
  };
  startExam = async () => {
      const id = uniqid()
        const exam = fetch("http://localhost:3001/exam/start", {
            method: "POST",
            body: JSON.stringify({
                "id": id,
                "candidateName": this.state.candidateName}),
            headers: {
              "Content-Type": "application/json",
            },
          }).then((response) => {
              this.setState({id: id}, ()=> console.log("Exam created with id: ", this.state.id))
              this.props.id(id)
              this.props.history.push('/exam')
              
          })
          
      }
    
  
  render() {
    return (
      <div className="wrap">
        <div className="exam-body">
          <div className="label">Your Name: </div>
          <input
            type="text"
            className="name-input"
            onChange={(e) => this.handleForm(e)}
          />
        </div>
        <div
          className="start-btn rounded-pill"
          onClick={() => this.startExam()}
        >
          START
        </div>
      </div>
    );
  }
}
export default withRouter(Start);
