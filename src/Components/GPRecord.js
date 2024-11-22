import React, { useState, useEffect } from 'react';
import { Table, Input, Button } from 'govuk-react';
import { useHistory } from 'react-router-dom';

function GPRecord() {
    const [FirstName, setFirstName] = useState('');
    const [Surname, setSurname] = useState('');
    const [Gender, setGender] = useState('');
    const [Postcode, setPostcode] = useState('');
    const [patients, setPatients] = useState({});
    const history = useHistory();

    function handleFormSubmit(event) {
        event.preventDefault();
        if (!FirstName || !Surname || !Gender || !Postcode) {
            alert('Please fill out all fields');
            return;
        }

        fetch('http://localhost:4000/gprecordchange', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ FirstName, Surname, Gender, Postcode })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Details updated');

                    fetch('http://localhost:4000/gprecord')
                        .then(response => response.json())
                        .then(data => setPatients(data.patients))
                        .catch(error => console.error(error));

                } else {
                    alert('Failure');
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        fetch('http://localhost:4000/gprecord')
            .then(response => response.json())
            .then(data => setPatients(data.patients))
            .catch(error => console.error(error));
    }, []);

    return (
        <>
            <Table caption="GP Record">
                <Table.Row>
                    <Table.CellHeader>NHS Number</Table.CellHeader>
                    <Table.Cell>{patients.NHSNumber}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.CellHeader>FirstName</Table.CellHeader>
                    <Table.Cell>
                        {patients.FirstName}
                        <Input type="text" onChange={e => setFirstName(e.target.value)} value={FirstName} />
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.CellHeader>Surname</Table.CellHeader>
                    <Table.Cell>
                        {patients.Surname}
                        <Input type="text" onChange={e => setSurname(e.target.value)} value={Surname} />
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.CellHeader>Date of Birth</Table.CellHeader>
                    <Table.Cell>{patients.DoB}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.CellHeader>Gender</Table.CellHeader>
                    <Table.Cell>{patients.Gender}
                        <Input type="text" onChange={e => setGender(e.target.value)} value={Gender} />
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.CellHeader>Postcode</Table.CellHeader>
                    <Table.Cell>
                        {patients.Postcode}
                        <Input type="text" onChange={e => setPostcode(e.target.value)} value={Postcode} />
                    </Table.Cell>
                </Table.Row>
            </Table>
            <Button onClick={handleFormSubmit}>Update</Button>
        </>
    );
}

export default GPRecord;