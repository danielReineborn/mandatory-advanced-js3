import React from 'react';
import Registration from "./Components/Registration";
import Login from "./Components/Login";
import Todos from "./Components/Todos";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <Router>
        <Route exact path="/" component={Todos}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route path="/register" component={Registration}></Route>

      </Router>
    );

  }
}

export default App;
