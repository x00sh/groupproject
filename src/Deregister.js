import { Page } from 'govuk-react';
import TopNav from '@govuk-react/top-nav';
import './App.css';
import DeregisterButton from './Components/DeregisterButton';

import LogoutButton from './Components/LogoutButton';



function Deregister() {
    
    return (
       
        <Page header={<TopNav company={<TopNav.Anchor href="/phome" ><TopNav.IconTitle>GP Surgery</TopNav.IconTitle></TopNav.Anchor>}
            serviceTitle={<TopNav.NavLink href="/phome" >Deregister</TopNav.NavLink>} />}>




            <DeregisterButton />
       
            <LogoutButton />

            </Page>
        
    );
}

export default Deregister;

