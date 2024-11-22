import { Page } from 'govuk-react';
import TopNav from '@govuk-react/top-nav';
import DoctorAppointment from './Components/DoctorAppointment';
import LogoutButton from './Components/LogoutButton';

import './App.css';

function Doctor() {
    return (
        <Page header={<TopNav company={<TopNav.Anchor href="/doctorhome"><TopNav.IconTitle>GP Surgery</TopNav.IconTitle></TopNav.Anchor>}
            serviceTitle={<TopNav.NavLink href="/doctorhome">Doctor Home Page</TopNav.NavLink>} />}>
            <h1>

      

            </h1>

            <DoctorAppointment />

        
            <LogoutButton />

        </Page>
    );
}

export default Doctor;