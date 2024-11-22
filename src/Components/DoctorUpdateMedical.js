import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Label } from 'govuk-react';
import { useHistory, useLocation } from 'react-router-dom';

function DoctorUpdateMedicalF() {
    const [medicalRecord, setMedicalRecord] = useState([]);
    const location = useLocation();

    const [newRecord, setNewRecord] = useState({
        NHSNumber: new URLSearchParams(location.search).get('NHSNumber') || '',
        VaccinationDate: '',
        VaccineManufacturer: '',
        DiseaseTargeted: '',
        DoseNo: '',
        VaccineType: '',
        Product: '',
        VaccineBatchNumber: '',
        CountryOfVaccination: '',
        Authority: '',
        Site: '',
        TotalSeriesOfDoses: '',
        DisplayName: '',
        SnomedCode: '',
        DateEntered: '',
        ProcedureCode: '',
        Booster: '',
    });

    const history = useHistory();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const NHSNumber = searchParams.get('NHSNumber');

        fetch(`http://localhost:4000/medical-record?NHSNumber=${NHSNumber}`)
            .then((response) => response.json())
            .then((data) => setMedicalRecord(data))
            .catch((error) => console.log(error));
    }, [location.search]);

    const handleInputChange = (event) => {
        setNewRecord({ ...newRecord, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const NHSNumber = new URLSearchParams(location.search).get('NHSNumber');

        fetch('http://localhost:4000/newMedicalRecord', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRecord),
        })
            .then(() => {
                fetch(`http://localhost:4000/medical-record?NHSNumber=${NHSNumber}`)
                    .then((response) => response.json())
                    .then((data) => {
                        setMedicalRecord(data);
                        setNewRecord({
                            NHSNumber: new URLSearchParams(location.search).get('NHSNumber') || '',
                            VaccinationDate: '',
                            VaccineManufacturer: '',
                            DiseaseTargeted: '',
                            DoseNo: '',
                            VaccineType: '',
                            Product: '',
                            VaccineBatchNumber: '',
                            CountryOfVaccination: '',
                            Authority: '',
                            Site: '',
                            TotalSeriesOfDoses: '',
                            DisplayName: '',
                            SnomedCode: '',
                            DateEntered: '',
                            ProcedureCode: '',
                            Booster: '',
                        });
                    })
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
    };

    const handleBack = () => {
        history.goBack();
    };


    return (
        <>
            {medicalRecord.length > 0 ? (
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
                        <Table.Cell>SnomedCode</Table.Cell>
                        <Table.Cell>Date Entered</Table.Cell>
                        <Table.Cell>Procedure Code</Table.Cell>
                        <Table.Cell>Booster</Table.Cell>
                    </Table.Row>
                    {medicalRecord.map((vaccine) => (
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
            ) : (
                    <div>No medical record found.</div>

            )}
            <h1>Add New Record</h1>
            <details>
                <summary>Add New Record</summary>
                <form onSubmit={handleSubmit}>
                    <Label>
                        Vaccination Date:
                        <Input type="date" name="VaccinationDate" value={newRecord.VaccinationDate} onChange={handleInputChange} />
                    </Label>
                    <br />
                    <Label>
                        Vaccine Manufacturer:
                        <Input type="text" name="VaccineManufacturer" value={newRecord.VaccineManufacturer} onChange={handleInputChange} />
                    </Label>
                    <br />
                    <Label>
                        Disease Targeted:
                        <Input type="text" name="DiseaseTargeted" value={newRecord.DiseaseTargeted} onChange={handleInputChange} />
                    </Label>
                    <br />
                    <Label>
                        Dose No:
                        <Input type="text" name="DoseNo" value={newRecord.DoseNo} onChange={handleInputChange} />
                    </Label>
                    <br />
                    <Label>
                        Vaccine Type:
                        <Input type="text" name="VaccineType" value={newRecord.VaccineType} onChange={handleInputChange} />
                    </Label>
                    <br />
                    <Label>
                        Product:
                        <Input type="text" name="Product" value={newRecord.Product} onChange={handleInputChange} />
                    </Label>
                    <br />
                    <Label>
                        Vaccine Batch Number:
                        <Input type="text" name="VaccineBatchNumber" value={newRecord.VaccineBatchNumber} onChange={handleInputChange} />
                    </Label>
                    <br />
                    <Label>
                        Country Of Vaccination:
                        <Input type="text" name="CountryOfVaccination" value={newRecord.CountryOfVaccination} onChange={handleInputChange} />
                    </Label>
                    <br />
                    <Label>
                        Authority:
                        <Input type="text" name="Authority" value={newRecord.Authority} onChange={handleInputChange} />
                    </Label>
                    <br />
                    <Label>
                        Site:
                        <Input type="text" name="Site" value={newRecord.Site} onChange={handleInputChange} />
                    </Label>
                    <br />
                    <Label>
                        Total Series Of Doses:
                        <Input type="text" name="TotalSeriesOfDoses" value={newRecord.TotalSeriesOfDoses} onChange={handleInputChange} />
                    </Label>
                    <br />
                    <Label>
                        Display Name:
                        <Input type="text" name="DisplayName" value={newRecord.DisplayName} onChange={handleInputChange} />
                    </Label>
                    <br />
                    <Label>
                        SnomedCode:
                        <Input type="text" name="SnomedCode" value={newRecord.SnomedCode} onChange={handleInputChange} />
                    </Label>
                    <br />
                    <Label>
                        Date Entered:
                        <Input type="date" name="DateEntered" value={newRecord.DateEntered} onChange={handleInputChange} />
                    </Label>
                    <br />
                    <Label>
                        Procedure Code:
                        <Input type="text" name="ProcedureCode" value={newRecord.ProcedureCode} onChange={handleInputChange} />
                    </Label>
                    <br />
                    <Label>
                        Booster:
                        <Input type="text" name="Booster" value={newRecord.Booster} onChange={handleInputChange} />
                    </Label>
                    <br />
                    <Button type="submit">Save</Button>
                    <Button type="button" onClick={handleBack}>Back</Button>
                </form>
            </details>
        </>
    );
       
  
}

export default DoctorUpdateMedicalF;
