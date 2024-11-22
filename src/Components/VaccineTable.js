import React, { useState, useEffect } from 'react';
import { Table } from 'govuk-react';

function VaccineTable() {
    const [vaccines, setVaccines] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/vaccines')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setVaccines(data);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    return (
        <Table>
            <Table.Row header>
                <Table.Cell>NHS Number</Table.Cell>
                <Table.Cell>Vaccination Date</Table.Cell>
                <Table.Cell>Vaccine Manufacturer</Table.Cell>
                <Table.Cell>Disease Targeted</Table.Cell>
                <Table.Cell>Dose No</Table.Cell>
                <Table.Cell>Vaccine Type</Table.Cell>
                <Table.Cell>Product</Table.Cell>
                <Table.Cell>Vaccine Batch Number</Table.Cell>
                <Table.Cell>Country of Vaccination</Table.Cell>
                <Table.Cell>Authority</Table.Cell>
                <Table.Cell>Site</Table.Cell>
                <Table.Cell>Total Series of Doses</Table.Cell>
                <Table.Cell>Display Name</Table.Cell>
                <Table.Cell>SnomedCode </Table.Cell>
                <Table.Cell>Date Entered</Table.Cell>
                <Table.Cell>Procedure Code</Table.Cell>
                <Table.Cell>Booster</Table.Cell>
            </Table.Row>
            {vaccines.map((vaccine) => (
                <Table.Row key={vaccine.id}>
                    <Table.Cell>{vaccine.NHSNumber}</Table.Cell>
                    <Table.Cell>{vaccine.VaccinationDate}</Table.Cell>
                    <Table.Cell>{vaccine.VaccineManufacturer}</Table.Cell>
                    <Table.Cell>{vaccine.DiseaseTargeted}</Table.Cell>
                    <Table.Cell>{vaccine.DoseNo}</Table.Cell>
                    <Table.Cell>{vaccine.VaccineType}</Table.Cell>
                    <Table.Cell>{vaccine.Product}</Table.Cell>
                    <Table.Cell>{vaccine.VaccineBatchNumber}</Table.Cell>
                    <Table.Cell>{vaccine.CountryOfVaccination}</Table.Cell>
                    <Table.Cell>{vaccine.Authority}</Table.Cell>
                    <Table.Cell>{vaccine.Site}</Table.Cell>
                    <Table.Cell>{vaccine.TotalSeriesOfDoses}</Table.Cell>
                    <Table.Cell>{vaccine.DisplayName}</Table.Cell>
                    <Table.Cell>{vaccine.SnomedCode}</Table.Cell>
                    <Table.Cell>{vaccine.DateEntered}</Table.Cell>
                    <Table.Cell>{vaccine.ProcedureCode}</Table.Cell>
                    <Table.Cell>{vaccine.Booster}</Table.Cell>
                </Table.Row>
            ))}
        </Table>
    );
}

export default VaccineTable;
