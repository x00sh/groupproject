import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Table } from 'govuk-react';

function DoctorWelcome() {
    const [doctor, setDoctor] = useState([]);
    const history = useHistory();

    useEffect(() => {
        fetch(`http://localhost:4000/doctorwelcome`)
            .then((response) => response.json())
            .then((data) => {
                setDoctor(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const doctorName = doctor.length > 0 ? `${doctor[0].FirstName} ${doctor[0].Surname}` : '';

    return (
        <>
            <h1>Welcome, {doctorName}!</h1>
        </>
    );
}

export default DoctorWelcome;


