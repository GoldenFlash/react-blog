import React, { Component } from 'react';
import {BrowserRouter as Router, Route,Switch ,withRouter,Redirect} from "react-router-dom";
import loadable from '@loadable/component'

import './App.css';
import 'antd/dist/antd.css';

const Index = loadable(() => import('./view/index/index.js'))
const Edite = loadable(() => import('./view/edite/edite'))
const NotFound = loadable(() => import('./components/404/index'))

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


