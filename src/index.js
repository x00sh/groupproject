import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from "./App";
import Register from "./Register";
import Doctor from "./Doctor";

const rootElement = document.getElementById("root");
ReactDOM.render
(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/register" component={Register} />
            <Route path="/doctor" component={Doctor} />

        </Switch>
    </BrowserRouter>,
    rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
