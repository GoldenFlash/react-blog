import React, { Component } from 'react';
import {BrowserRouter as Router, Route,Switch ,withRouter,Redirect} from "react-router-dom";

import './App.css';
import 'antd/dist/antd.css';

import Index from './view/index/index.js'
import Edite from './view/edite/edite'
import Register from './view/register/register'
import NotFound from "./components/404/index"
// import { NOTFOUND } from 'dns';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router basename="/blog">
          
          <Switch>
            <Route path="/edite" component={Edite} />
            <Route path="/" component={Index}></Route>
            {/* <Redirect from="/" to="/home"></Redirect> */}
            <Route path="*" component={NotFound} ></Route>
             
          </Switch> 
        
        </Router> 
      </div>
    );
  }
}
export default App;


