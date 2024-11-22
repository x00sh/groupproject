import React, { useState } from 'react';
import { Page } from 'govuk-react';
import TopNav from '@govuk-react/top-nav';
import { Button } from 'govuk-react';
import { Link } from 'react-router-dom';
import LogoutButton from './Components/LogoutButton';

import './App.css';


function PatientHome() {

    return (
        <Page header={<TopNav company={<TopNav.Anchor href="/phome" ><TopNav.IconTitle>GP Surgery</TopNav.IconTitle></TopNav.Anchor>}
            serviceTitle={<TopNav.NavLink href="/phome" >Home Page</TopNav.NavLink>} />}>



            <div>


                <Link to="/booking">
                    <Button style={{ width: '150px' }}>Book Appointment</Button>
                </Link>

                <Link to="/patientcancel">
                    <Button style={{ width: '150px', marginLeft: '20px' }}>View/Cancel Appointments</Button>
                </Link>
            </div>
            <div>
                <Link to="/viewmed">
                    <Button style={{ width: '150px' }}>View Medical Record</Button>
                </Link>
                <Link to="/updategp">
                    <Button style={{ width: '150px', marginLeft: '20px' }}>Update GP record</Button>
                </Link>

            </div>
            <div>
                <Link to="/deregister">
                    <Button style={{ width: '150px' }}>Deregister</Button>
                </Link>

                
                <LogoutButton />
            </div>


            
          

        </Page>
    );
}

export default PatientHome;