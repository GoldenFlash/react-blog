import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";
import './index.css';
import App from './App';
import Article from './view/article/article'
import * as serviceWorker from './serviceWorker';

import createBrowserHistory from 'history/createBrowserHistory'
const history = createBrowserHistory()
ReactDOM.render(
    <Router >
        <div>
            <Switch>
                <Route exact  path="/" component={App}></Route>
                <Route path="/article" component={Article}/>
           
            </Switch> 
        </div>
    </Router>  
     
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
