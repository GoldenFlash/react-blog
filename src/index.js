import React from 'react';
import ReactDOM from 'react-dom';

// import hljs from 'highlight.js/lib/highlight';
// import javascript from 'highlight.js/lib/languages/javascript';
// import 'highlight.js/styles/github.css';

import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/atom-one-light.css'
import './index.css';
import './styles/markdown.scss'
import App from './App';

// import App from './test';
import * as serviceWorker from './serviceWorker';

hljs.registerLanguage('javascript', javascript);




ReactDOM.render(<App/>,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
