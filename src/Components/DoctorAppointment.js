import { useState, useEffect } from 'react';
import { Table } from 'govuk-react';

function DoctorAppointment() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/doctorappointments')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setAppointments(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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
                </Table.Row>
            ))}
        </Table>
    );
}

export default DoctorAppointment;
