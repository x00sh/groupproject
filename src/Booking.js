import React, { useState } from 'react';
import { Page } from 'govuk-react';
import TopNav from '@govuk-react/top-nav';
import './App.css';
import { createContext } from 'react';
import BookingInput from './Components/BookingInput';
import LogoutButton from './Components/LogoutButton';

export const CurrentContext = createContext({
    email: '',
    setEmail: () => { },
    password: '',
    setPassword: () => { },
    NHS: '',
    setNHS: () => { },
    gender: '',
    setGender: () => { },
    DoB: '',
    setDoB: () => { }
});

function Booking() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [NHS, setNHS] = useState('');
    const [gender, setGender] = useState('');
    const [DoB, setDoB] = useState('');
    return (
        <CurrentContext.Provider value={{ email, setEmail, password, setPassword, NHS, setNHS, gender, setGender, DoB, setDoB }}>
            <Page header={<TopNav company={<TopNav.Anchor href="/phome" ><TopNav.IconTitle>GP Surgery</TopNav.IconTitle></TopNav.Anchor>}
                serviceTitle={<TopNav.NavLink href="/phome" >Booking</TopNav.NavLink>} />}>



                <BookingInput />

                <LogoutButton />

            </Page>
        </CurrentContext.Provider>
    );
}

export default Booking;

