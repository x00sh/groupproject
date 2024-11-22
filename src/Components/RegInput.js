import { Input, LabelText, Button } from 'govuk-react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

function RegInput(props) {
    const [Regemail, setEmail] = useState('');
    const [Regpassword, setPassword] = useState('');
    const [NHS, setNHS] = useState('');
    const [gender, setGender] = useState('');
    const [DoB, setDoB] = useState('');
    const history = useHistory();

    function handleFormSubmit(event) {
        event.preventDefault();
        if (!Regemail || !Regpassword || !NHS || !gender || !DoB) {
            alert('Please fill out all fields');
            return;
        }

        fetch('http://localhost:4000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ NHS, Regemail, Regpassword, gender, DoB }),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(data => {
                if (data.success) {
                    alert('Registration complete');
                    history.push('/');
                } else {
                    alert('User already exists or Invalid NHS number');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    return (
        <>
            <div>
                <LabelText>Enter your email:</LabelText>
                <Input type="email" onChange={e => setEmail(e.target.value)} value={Regemail} />

                <LabelText>Enter your password:</LabelText>
                <Input type="password" onChange={e => setPassword(e.target.value)} value={Regpassword} />

                <LabelText>Enter your NHS number:</LabelText>
                <Input type="number" onChange={e => setNHS(e.target.value)} value={NHS} />

                <LabelText>Enter your gender:</LabelText>
                <Input type="text" onChange={e => setGender(e.target.value)} value={gender} />

                <LabelText>Enter your date of birth:</LabelText>
                <Input type="date" onChange={e => setDoB(e.target.value)} value={DoB} />
            </div>
            <Button onClick={handleFormSubmit}>Submit</Button>
        </>
    );
}

export default RegInput;
