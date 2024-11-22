import React, { useState } from 'react';
import { Page } from 'govuk-react';
import TopNav from '@govuk-react/top-nav';
import './App.css';
import RegAltInput from './Components/RegAltInput';
import { createContext } from 'react';

export const CurrentContext = createContext({
    email: '',
    setEmail: () => { },
    password: '',
    setPassword: () => { },
    post: '',
    setPost: () => { },
    fName: '',
    setFname: () => { },
    sName: '',
    setSname: () => { },
    gender: '',
    setGender: () => { },
    DoB: '',
    setDoB: () => { }
});

function RegisterAlt() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [post, setPost] = useState('');
    const [fName, setFname] = useState('');
    const [sName, setSname] = useState('');
    const [gender, setGender] = useState('');
    const [DoB, setDoB] = useState('');
    return (
        <CurrentContext.Provider value={{ email, setEmail, password, setPassword, post, setPost, fName, setFname, sName, setSname, gender, setGender, DoB, setDoB }}>
            <Page header={<TopNav company={<TopNav.Anchor href="/" ><TopNav.IconTitle>GP Surgery</TopNav.IconTitle></TopNav.Anchor>}
                serviceTitle={<TopNav.NavLink href="/" >Registration</TopNav.NavLink>} />}>

                <RegAltInput />
                

            </Page>
        </CurrentContext.Provider>
    );
}

export default RegisterAlt;