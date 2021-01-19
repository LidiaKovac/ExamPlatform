import { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.scss";
import Exam from "./components/Exam";
import Start from "./components/Start";

function App() {
  const [id, setId] = useState();
  const getInfo = (_id) => {
    setId({ _id });
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/">
          <Start id={getInfo} />
        </Route>
        <Route exact path="/exam">
          <Exam id={id}/>
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
