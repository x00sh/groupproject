import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from "./App";
import Register from "./Register";
import Doctor from "./Doctor";
import Receptionist from "./Receptionist";
import Booking from "./Booking";
import PatientCancel from "./PatientCancel";
import Deregister from "./Deregister";
import PatientHome from "./PatientHome";
import RegisterAlt from "./RegisterAlt";
import ViewMed from "./ViewMed"
import UpdateGP from "./UpdateGP";
import DoctorHome from "./DoctorHome";
import DoctorMedical from "./DoctorMedical";
import DoctorUpdateMedicalF from "./DoctorUpdateMedicalF";

const rootElement = document.getElementById("root");
ReactDOM.render
(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/register" component={Register} />
            <Route path="/doctor" component={Doctor} />
            <Route path="/receptionist" component={Receptionist} />
            <Route path="/booking" component={Booking} />
            <Route path="/patientcancel" component={PatientCancel} />
            <Route path="/deregister" component={Deregister} />

            <Route path="/DoctorUpdateMedicalF" component={DoctorUpdateMedicalF} />
            <Route path="/doctormedical" component={DoctorMedical} />
            <Route path="/doctorhome" component={DoctorHome} />
            <Route path="/phome" component={PatientHome} />
            <Route path="/viewmed" component={ViewMed} />
            <Route path="/updategp" component={UpdateGP} />
            <Route path="/registeralt" component={RegisterAlt} />

        </Switch>
    </BrowserRouter>,
    rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
