import React, { Component } from 'react';
import {BrowserRouter as Router, Route,Switch ,withRouter} from "react-router-dom";

import './App.css';
import 'antd/dist/antd.css';

// import hljs from 'highlight.js'
// import javascript from 'highlight.js/lib/languages/javascript'
// import 'highlight.js/styles/atom-one-light.css'

// hljs.registerLanguage('javascript', javascript)

import Index from './view/index/index.js'
import Edite from './view/edite/edite'
import Register from './view/register/register'

// import Article from './view/article/article'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router >
          <div>
          <Switch>
              <Route path="/home" component={Index}>
                {/* <Route path="/article" component={Article}></Route> */}
              </Route>
              <Route path="/edite" component={Edite}/>
              <Route path="/register" component={Register}/>
          </Switch> 
          </div>
        </Router> 
      </div>
    );
  }
}
export default App;


