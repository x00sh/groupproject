import { useState, useEffect } from 'react';
import { Table, Button } from 'govuk-react';

function PatientAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:4000/patientappointments')
            .then(response => response.json())
            .then(data => setAppointments(data))
            .catch(error => {
                console.log(error);
                setError(error);
            });
    }, []);

    const handleDeleteAppointment = (id) => {
        fetch('http://localhost:4000/appointments', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
            .then(response => response.json())
            .then(data => {
                const updatedAppointments = appointments.filter((appointment) => appointment.id !== id);
                setAppointments(updatedAppointments);
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    return (
        <Table>
            <Table.Row header>
                <Table.Cell>Date</Table.Cell>
                <Table.Cell>Time</Table.Cell>
                <Table.Cell>NHS Number</Table.Cell>
                <Table.Cell>Postcode</Table.Cell>
                <Table.Cell>Doctor medical license</Table.Cell>
                <Table.Cell></Table.Cell>
            </Table.Row>
            {appointments.map((appointment) => (
                <Table.Row key={appointment.id}>
                    <Table.Cell>{appointment.date}</Table.Cell>
                    <Table.Cell>{appointment.time}</Table.Cell>
                    <Table.Cell>{appointment.NHSNumber}</Table.Cell>
                    <Table.Cell>{appointment.Postcode}</Table.Cell>
                    <Table.Cell>{appointment.DoctorLicense}</Table.Cell>
                    <Table.Cell>
                        <Button onClick={() => handleDeleteAppointment(appointment.id)}>Delete</Button>
                    </Table.Cell>
                </Table.Row>
            ))}
        </Table>
    );
}

export default PatientAppointments;
