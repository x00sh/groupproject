import React, { useState, useEffect } from 'react';
import { Table, Button } from 'govuk-react';
import { useHistory } from 'react-router-dom';

function DoctorMedical1() {
    const [patients, setPatients] = useState([]);
    const history = useHistory();

    useEffect(() => {
        fetch('http://localhost:4000/patients')
            .then((response) => response.json())
            .then((data) => {
                setPatients(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleViewMedicalRecord = (NHSNumber) => {
        history.push({
            pathname: '/DoctorUpdateMedicalF',
            search: `NHSNumber=${NHSNumber}`,
        });
    };



    return (
        <Table>
            <Table.Row header>
                <Table.Cell>NHS Number</Table.Cell>
                <Table.Cell>User Email</Table.Cell>
            </Table.Row>
            {patients.map((patient) => (
                <Table.Row key={patient.NHSNumber}>
                    <Table.Cell>{patient.NHSNumber}</Table.Cell>
                    <Table.Cell>{patient.userEmail}</Table.Cell>
                    <Table.Cell>
                        <Button onClick={() => handleViewMedicalRecord(patient.NHSNumber)}> View </Button>
                    </Table.Cell>
                </Table.Row>
            ))}
        </Table>
    );
}

export default DoctorMedical1;
