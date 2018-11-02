import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainMenu from './Pages/MainMenu';
import Login from './Pages/Login';
import Detail from './Pages/Detail';
import Jadwal from './Pages/Jadwal';
import Hasil from './Pages/Result';
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from "history";
import { BrowserRouter, Route} from 'react-router-dom';
ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact path="/" component={Login} />
            <Route path="/Mainmenu" component={MainMenu} />
            <Route path="/detail/:ruangan" component={Detail} />
            <Route path = "/jadwal" component = {Jadwal}  />
            <Route path = "/result/:date/:start_time/:end_time" component ={Hasil}/>
        </div>
    </BrowserRouter>
    , document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
