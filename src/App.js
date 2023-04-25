import React, { useState } from 'react';
import { Page } from 'govuk-react';
import TopNav from '@govuk-react/top-nav';
import { Button } from 'govuk-react';
import { Link } from 'react-router-dom';
import './App.css';
import { createContext } from 'react';
import Loginprocess from './Components/Loginprocess';

export const CurrentContext = createContext({
    email: '',
    setEmail: () => { },
    password: '',
    setPassword: () => { },
});

function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <CurrentContext.Provider value={{ email, setEmail, password, setPassword }}>
            <Page
                header={
                    <TopNav
                        company={
                            <TopNav.Anchor href="https://example.com" target="new">
                                <TopNav.IconTitle>GP Surgery</TopNav.IconTitle>
                            </TopNav.Anchor>
                        }
                        serviceTitle={<TopNav.NavLink href="https://example.com" target="new">Login Page</TopNav.NavLink>}
                    />
                }
            >
                <h1>
                    
                   
                    


                    <div> <Loginprocess /></div>

                </h1>
                <div>
                    <Link to="/register">
                        <Button>Register</Button>
                    </Link>
                </div>
            </Page>
        </CurrentContext.Provider>
    );
}

export default App;
