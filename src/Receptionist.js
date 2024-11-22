import { Page } from 'govuk-react';
import TopNav from '@govuk-react/top-nav';
import Appointments from './Components/Appointments';
import LogoutButton from './Components/LogoutButton';


import './App.css';

function Receptionist() {
    return (
        <Page header={<TopNav company={<TopNav.Anchor href=" /receptionist" ><TopNav.IconTitle>GP Surgery</TopNav.IconTitle></TopNav.Anchor>}
            serviceTitle={<TopNav.NavLink href="/receptionist" >Receptionist Home Page</TopNav.NavLink>} />}>


            <h1>

       

            </h1>

            <Appointments />


            
            <LogoutButton />

        </Page>
    );
}

export default Receptionist;