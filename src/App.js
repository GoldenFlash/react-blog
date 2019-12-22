import React, { Component } from 'react';
import thunkMiddleware from 'redux-thunk';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import loadable from '@loadable/component';

import { createStore,applyMiddleware  } from "redux"
import { Provider } from "react-redux"
import reducers from "@/redux/reducers"

import './App.css';
import 'antd/dist/antd.css';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

// import Index from "./view/index/index.js"

const Index = loadable(() => import('./view/index/index.js'))
// const Index = loadable(() => import('./view/index/index.js'))
const Edite = loadable(() => import('./view/manage/index'))
// const Edite = loadable(() => import('./view/edite/edite'))
const NotFound = loadable(() => import('./components/404/index'))

var store = createStore(
  reducers, 
  applyMiddleware(
    thunkMiddleware, // 允许我们 dispatch() 函数
  )
)
class App extends Component {
    render() {
        return (
            <Provider store = {store}>
              <Router>
                  <Switch>
                      <Route path="/edite" component={Edite} />
                      {/* <Redirect from ="/" to='/list' /> / */}
                      <Route path="/"  component={Index}></Route>

                      <Route path="*" component={NotFound} ></Route>
                  </Switch>
              </Router> 
            </Provider>
        );
    }
}
export default App;