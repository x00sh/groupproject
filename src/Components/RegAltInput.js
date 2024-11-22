import { Input, LabelText, Button} from 'govuk-react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

function RegAltInput(props) {
    const [Regemail, setEmail] = useState('');
    const [Regpassword, setPassword] = useState('');
    const [post, setPost] = useState('');
    const [fName, setFname] = useState('');
    const [sName, setSname] = useState('');
    const [gender, setGender] = useState('');
    const [DoB, setDoB] = useState('');
    const history = useHistory();


    function handleFormSubmit(event) {
        event.preventDefault();
        if (!Regemail || !Regpassword || !post || !fName || !sName || !gender || !DoB) {
            alert('Please fill out all fields');
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ post, Regemail, Regpassword, fName, sName, gender, DoB })
        };

        fetch('http://localhost:4000/registeralt', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Registration complete');
                    history.push("/");
                } else {
                    alert('User already exists or Invalid Postcode');
                }
            })
            .catch(error => {
                console.error(error);
            });
    }



    return (
        <>
            <div>
                <LabelText>Enter your email:</LabelText>
                <Input type="email" onChange={e => setEmail(e.target.value)} value={Regemail} />

                <LabelText>Enter your password:</LabelText>
                <Input type="password" onChange={e => setPassword(e.target.value)} value={Regpassword} />

                <LabelText>Enter your postcode:</LabelText>
                <Input type="text" onChange={e => setPost(e.target.value)} value={post} />

                <LabelText>Enter your first name:</LabelText>
                <Input type="text" onChange={e => setFname(e.target.value)} value={fName} />

                <LabelText>Enter your surname:</LabelText>
                <Input type="text" onChange={e => setSname(e.target.value)} value={sName} />

                <LabelText>Enter your gender:</LabelText>
                <Input type="text" onChange={e => setGender(e.target.value)} value={gender} />

                <LabelText>Enter your date of birth:</LabelText>
                <Input type="date" onChange={e => setDoB(e.target.value)} value={DoB} />
            </div>
            <Button onClick={handleFormSubmit}>Submit</Button>
        </>
    );
}

export default RegAltInput;
