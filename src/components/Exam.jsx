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
    const examDB = await fetch(
      "http://localhost:3001/exam/" + this.props.id._id
    );
    const exam = await examDB.json();
    this.setState({ exam: exam[0] });
    this.setState({ questions: this.state.exam.questions })
  };
  nextQuestion = async() => {
      if (this.state.questNum < 4) {
      this.setState({questNum: this.state.questNum+1})}
      else if(this.state.questNum === 4) {
        console.log("Done!")

    }
    try {
      const response = await fetch("http://localhost:3001/exam/" + this.props.id._id + "/answer", {
      method: 'POST',
      body: JSON.stringify({
        "question": this.state.questNum,
        "answer": parseInt(this.state.answer)
      }),
      headers: {
        "Content-Type": "application/json", //IMPORTANT
      }
    })
    let exam = await response.json()
    await this.state.exam.score < 5 ? 
      this.setState({exam: exam[0]}, ()=> {console.log(this.state.exam.score)}) : 
      console.log("You already reached the max points for this exam. ")
  }catch(error) {
      console.log(error)
    }
  }

  handleAnswer = (e) => {
    console.log(e.target.id)
    this.setState({answer: e.target.id})
  }

  render() {
    return (
      <div className="wrap">
        {this.state.questNum < 4 ? (<div className="exam-body-start">
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
        </div>) : <div className='exam-body-start'>The exam is done! Here is your score: {this.state.exam.score}</div> }
        {this.state.questNum < 4 && <div className='next-btn rounded-pill' onClick={this.nextQuestion}>
            SUBMIT
        </div>}
      </div>
    );
  }
}
export default Exam;
