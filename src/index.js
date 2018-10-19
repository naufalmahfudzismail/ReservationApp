import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Pages/Login';
import Main from './Pages/MainMenu';
import Detail from './Pages/Detail';
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from "history";

import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Detail />
    </BrowserRouter>
    , document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
