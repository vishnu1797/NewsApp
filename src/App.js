import './App.css';
import Navbar from './components/Navbar'
import React, { Component } from 'react'
import News from './components/News';
// import Newsitem from './components/Newsitem';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
        <Navbar  />        
        <Switch>
          <Route exact path="/general"> <News key="/general" country={'in'} category={'general'} pageSize={8}/> </Route>
          <Route exact path="/"> <News key="/general" country={'in'} category={'general'} pageSize={8}/> </Route>
          <Route exact path="/health"> <News key="/health" country={'in'} category={'health'} pageSize={8}/> </Route>
          <Route exact path="/entertainment"> <News key="/entertainment" country={'in'} category={'entertainment'} pageSize={8}/> </Route>
          <Route exact path="/sports"> <News key="/sports" country={'in'} category={'sports'} pageSize={8}/> </Route>
          <Route exact path="/technology"> <News key="/technology" country={'in'} category={'technology'} pageSize={8}/> </Route>
          <Route exact path="/business"> <News key="/business" country={'in'} category={'business'} pageSize={8}/> </Route>
          <Route exact path="/science"> <News key="/science" country={'in'} category={'sciencnpe'} pageSize={8}/> </Route>
        </Switch>
        </Router>
      </div>
    )
  }
}
