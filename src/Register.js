import { Page } from 'govuk-react';
import TopNav from '@govuk-react/top-nav';


import './App.css';

function Register() {
    return (
        <Page header={<TopNav company={<TopNav.Anchor href="https://example.com" target="new"><TopNav.IconTitle>GP Surgery</TopNav.IconTitle></TopNav.Anchor>} serviceTitle={<TopNav.NavLink href="https://example.com" target="new">Registration Page</TopNav.NavLink>} />}>
            <h1>

            <p>WOOOOOOOOOOOOOOOOOOOOOOOOOOOO</p>

            </h1>


        </Page>
    );
}

export default Register;
