import { useState } from 'react';
import { Button, LabelText, Input } from 'govuk-react';
import { Link,Histor } from 'react-router-dom';


import axios from 'axios';

function Loginprocess(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin() {
        if (!email || !password) {
            alert('Email and password are required');
            return;
        }

        axios.post('http://localhost:4000/login', { email, password })
            .then(res => {
                const userType = res.data.userType;
                if (userType === 'R') {
                    alert(userType);   

                } else if (userType === 'D') {

                    alert(userType);    
                }

            })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleDelayedLogin() {
        setTimeout(() => {
            handleLogin();
        }, 1000);
    }

    return (
        <>
            <div>
            <LabelText>Enter your email:</LabelText>
            <Input type="email" id="email" name="email" onChange={handleChangeEmail} value={email} />

            <LabelText>Enter your password:</LabelText>
            <Input type="password" id="password" name="password" onChange={handleChangePassword} value={password} />

            </div>
            <Button onClick={handleDelayedLogin}>Log in</Button>
        </>
    );
}

export default Loginprocess;
