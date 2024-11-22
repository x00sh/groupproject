import { Page } from 'govuk-react';
import TopNav from '@govuk-react/top-nav';
import PatientAppointments from './Components/PatientAppointments';
import LogoutButton from './Components/LogoutButton';


import './App.css';

function PatientCancel() {
    return (
        <Page header={<TopNav company={<TopNav.Anchor href="/phome" ><TopNav.IconTitle>GP Surgery</TopNav.IconTitle></TopNav.Anchor>}
            serviceTitle={<TopNav.NavLink href="/phome" >Patient Cancel Page</TopNav.NavLink>} />}>
            <h1>

            </h1>


            <PatientAppointments />


            
            <LogoutButton />

        </Page>
    );
}

export default PatientCancel;