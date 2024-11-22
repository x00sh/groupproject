import { useState } from 'react';
import { Button, LabelText, Input } from 'govuk-react';
import { useHistory } from 'react-router-dom';

function Loginprocess(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    function handleFormSubmit(event) {
        event.preventDefault();
        if (!email || !password) {
            alert('Email and password are required');
            return;
        }

        fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const userType = data.userType;
                    if (userType === 'R') {
                        history.push('/receptionist');
                    } else if (userType === 'D') {
                        history.push('/doctorhome');
                    } else if (userType === 'P') {
                        history.push('/phome');
                    } else {
                        console.error('Unknown user type:', userType);
                        alert('Unknown user type');
                    }
                } else {
                    console.error(data.message);
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error(error);
                alert('An error occurred');
            });
    }


    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    return (
        <>
            <div>
                <LabelText>Enter your email:</LabelText>
                <Input type="email" id="email" name="email" onChange={handleChangeEmail} value={email} />

                <LabelText>Enter your password:</LabelText>
                <Input type="password" id="password" name="password" onChange={handleChangePassword} value={password} />
            </div>
            <Button onClick={handleFormSubmit}>Log in</Button>
        </>
    );
}

export default Loginprocess;
