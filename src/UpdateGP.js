import React, { useState } from 'react';
import { Page } from 'govuk-react';
import TopNav from '@govuk-react/top-nav';
import './App.css';
import GPRecord from "./Components/GPRecord"
import { createContext } from 'react';
import LogoutButton from './Components/LogoutButton';
export const CurrentContext = createContext({
    FirstName: '',
    setFirstName: () => { },
    Surname: '',
    setSurname: () => { },
    Gender: '',
    setGender: () => { },
    Postcode: '',
    setPostcode: () => { },
});

function UpdateGP() {
    const [FirstName, setFirstName, Surname, setSurname, Gender, setGender, Postcode, setPostcode] = useState('');
    return (
        <CurrentContext.Provider value={{ FirstName, setFirstName, Surname, setSurname, Gender, setGender, Postcode, setPostcode }}>
            <Page header={<TopNav company={<TopNav.Anchor href="/phome" ><TopNav.IconTitle>GP Surgery</TopNav.IconTitle></TopNav.Anchor>}
                serviceTitle={<TopNav.NavLink href="/phome">GP Record</TopNav.NavLink>} />}>
                <GPRecord />


                <LogoutButton />



            </Page>



        </CurrentContext.Provider>
    );
}

export default UpdateGP;