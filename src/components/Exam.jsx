import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styling/Exam.scss";

class Exam extends React.Component {
  state = {
    exam: {},
    questNum: 0,
    questions: [],
  };
  componentDidMount = async () => {
    console.log(this.props.id._id);
    const examDB = await fetch(
      "http://localhost:3001/exam/" + this.props.id._id
    );
    const exam = await examDB.json();
    this.setState({ exam: exam[0] }, () => console.log(this.state.exam));
    this.setState({ questions: this.state.exam.questions });
    console.log(this.state.questions[0].text);
  };
  nextQuestion = () => {
      this.setState({questNum: this.state.questNum+1}, ()=>console.log(this.state.questNum))
  }

  handleAnswer = (e) => {
    console.log(e.target.id)
    this.setState({answer: e.target.id})
  }

  render() {
    return (
      <div className="wrap">
        <div className="exam-body-start">
          <div className="question-text">
            {this.state.questions[this.state.questNum] &&
              this.state.questions[this.state.questNum].text}
          </div>
          <div className="answer-wrap">
            {this.state.questions[this.state.questNum] &&
              this.state.questions[this.state.questNum].answers.map(
                (answ, index) => (
                  <div className="answer-body">
                    <input type="radio" id={index} name="answer" onChange={(e)=>this.handleAnswer(e)} />
                    <label for={index}>{answ.text}</label>
                  </div>
                )
              )}
          </div>
        </div>
        <div className='next-btn rounded-pill' onClick={this.nextQuestion}>
            SUBMIT
        </div>
      </div>
    );
  }
}
export default Exam;
