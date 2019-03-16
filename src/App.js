import React, { Component } from 'react';
import {BrowserRouter as Router, Route,Switch ,withRouter} from "react-router-dom";

import './App.css';
import 'antd/dist/antd.css';

import Index from './view/index/index.js'
import Edite from './view/edite/edite'
import Register from './view/register/register'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router basename="/blog">
          <div>
          <Switch>
              <Route  path="/home" component={Index}/>
              <Route  path="/edite" component={Edite}/>
              <Route  path="/register" component={Register}/>
          </Switch> 
          </div>
        </Router> 
      </div>
    );
  }
}
export default App;


