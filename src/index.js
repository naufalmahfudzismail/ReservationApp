import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainMenu from './Pages/MainMenu';
import Login from './Pages/Login';
import Detail from './Pages/Detail';

import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from "history";
import { BrowserRouter, Route} from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact path="/" component={MainMenu} />
            <Route path="/login" component={Login} />
            <Route path="/detail/:ruangan" component={Detail} />
        </div>
    </BrowserRouter>
    , document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
