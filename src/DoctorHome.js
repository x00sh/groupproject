import { Page } from 'govuk-react';
import TopNav from '@govuk-react/top-nav';
import { Button } from 'govuk-react';
import { Link } from 'react-router-dom';
import LogoutButton from './Components/LogoutButton';
import DoctorWelcome from './Components/DoctorWelcome';


function DoctorHome() {

    return (
        <Page header={<TopNav company={<TopNav.Anchor href="/doctorhome" ><TopNav.IconTitle>GP Surgery</TopNav.IconTitle></TopNav.Anchor>}
            serviceTitle={<TopNav.NavLink href="/doctorhome" >Doctor Home Page</TopNav.NavLink>} />}>




            <div>
                <DoctorWelcome />
              


                <Link to="/doctor">
                    <Button style={{ width: '150px' }}>View Assigned Appointments</Button>
                </Link>

                <Link to="/doctormedical">
                    <Button style={{ width: '150px', marginLeft: '20px'}}>Update Medical Reecords</Button>
                </Link>

            </div>

            <LogoutButton />

        </Page>
    );
}

export default DoctorHome; 