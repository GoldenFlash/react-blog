import React, { Component } from 'react';
import {BrowserRouter as Router, Route,Switch ,withRouter} from "react-router-dom";

import './App.css';
import 'antd/dist/antd.css';

import Index from './view/index/index.js'
import Article from './view/article/article'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router >
          <Switch>
              <Route exact  path="/" component={Index}></Route>
              <Route path="/article" component={Article}/>
          </Switch> 
        </Router> 
      </div>
    );
  }
}
export default App;
