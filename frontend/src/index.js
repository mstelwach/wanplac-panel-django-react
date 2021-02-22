import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import App from "./Components/App/App";

// styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'paper-kit-react/src/assets/css/paper-kit.css';
import 'react-datepicker/dist/react-datepicker.css';


ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
