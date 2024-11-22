import React, { useState } from 'react';
import { Page } from 'govuk-react';
import TopNav from '@govuk-react/top-nav';
import './App.css';
import VaccineTable from './Components/VaccineTable';
import LogoutButton from './Components/LogoutButton';

function ViewMed() {
    return (
        <Page header={<TopNav company={<TopNav.Anchor href="/phome" ><TopNav.IconTitle>GP Surgery</TopNav.IconTitle></TopNav.Anchor>}
            serviceTitle={<TopNav.NavLink href="/phome" >Medical Record</TopNav.NavLink>} />}>


            <VaccineTable />


            
            <LogoutButton />

        </Page>
    );
}

export default ViewMed;
