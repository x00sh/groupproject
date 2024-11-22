const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');
const app = express();
const bcrypt = require('bcrypt');

app.use(cors());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let db = new sqlite3.Database('local.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the local database.');
});

const vaccineDb = new sqlite3.Database('vaccines.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the vaccines database.');
});






app.post('/login', (req, res) => {
    const { email, password } = req.body;
    

    // Check if the email exists
    db.all(`SELECT * FROM Users WHERE userEmail = '${email}'`, (err, rows) => {
        if (err) {
            throw err;
        }
        if (rows.length > 0) { // Email exists, check the password
            const userType = rows[0].userType; // retrieve the user type from the current row
         
            const storedPassword = rows[0].userPassword;
            if (storedPassword.startsWith('$2')) { // Check if the stored password is encrypted
                bcrypt.compare(password, storedPassword, (err, result) => { // Compare the provided password with the hashed password in the database
                    if (result) { // Password matches
                        if (userType === 'R') {
                            const receptionistId = rows[0].receptionistId;
                            localStorage.setItem('receptionistId', receptionistId);
                            localStorage.setItem('loggedIn', 'true'); // set loggedIn to true
                            res.json({ success: true, userType: 'R' }); // return JSON response with user type
                        } else if (userType === 'D') {
                            const medicalLicense = rows[0].MedicalLicense;
                            localStorage.setItem('medical', medicalLicense);
                            localStorage.setItem('loggedIn', 'true'); // set loggedIn to true
                            res.json({ success: true, userType: 'D' }); // return JSON response with user type
                        } else if (userType === 'P') {
                            const nhsNumber = rows[0].NHSNumber;
                            localStorage.setItem('NHSNumber', nhsNumber);
                            localStorage.setItem('loggedIn', 'true'); // set loggedIn to true
                            res.json({ success: true, userType: 'P' });
                            
                        } else {
                            res.json({ success: false, message: 'Unknown user type' }); // handle other user types as needed
                        }
                    } else { // Password doesn't match
                        res.json({ success: false, message: 'Invalid password' });
                    }
                });
            } else { // Stored password is not encrypted
                if (password === storedPassword) { // Directly compare the provided password with the stored password
                    if (userType === 'R') {
                        const receptionistId = rows[0].receptionistId;
                        localStorage.setItem('receptionistId', receptionistId);
                        localStorage.setItem('loggedIn', 'true'); // set loggedIn to true
                        res.json({ success: true, userType: 'R' }); // return JSON response with user type
                    } else if (userType === 'D') {
                        const medicalLicense = rows[0].MedicalLicense;
                        localStorage.setItem('medical', medicalLicense);
                        localStorage.setItem('loggedIn', 'true'); // set loggedIn to true
                        res.json({ success: true, userType: 'D' }); // return JSON response with user type
                    } else if (userType === 'P') {
                        const nhsNumber = rows[0].NHSNumber;
                        localStorage.setItem('NHSNumber', nhsNumber);
                        localStorage.setItem('loggedIn', 'true'); // set loggedIn to true
                        res.json({ success: true, userType: 'P' });
                      
                    } else {
                        res.json({ success: false, message: 'Unknown user type' }); // handle other user types as needed
                    }
                } else { // Password doesn't match
                    res.json({ success: false, message: 'Invalid password' });
                }
            }
        } else { // Email does not exist
            res.json({ success: false, message: 'Invalid email' });
        }
    });
});
       


app.post('/logout', (req, res) => {
    localStorage.clear(); // clear all storage variables
    res.redirect('/login'); // redirect to login page
});


app.post('/registeralt', (req, res) => {
    const { post, Regemail, Regpassword, fName, sName, gender, DoB } = req.body;
   

    // Check if the Postcode exists in the database
    vaccineDb.get(`SELECT * FROM patients WHERE Postcode = '${post}'`, (err, row) => {
        if (err) {
            throw err;
        }
        if (row) {
            const NHSNumber = row.NHSNumber;
           
            // Check if the email address is already registered for the same NHS number in the Users table
            db.get(`SELECT * FROM Users WHERE NHSNumber = ${NHSNumber}`, (err, user) => {
                if (err) {
                    throw err;
                }
                if (user) {
                    console.log("User already exists");
                    res.json({ success: false });
                   
                } else {
                    vaccineDb.all(`SELECT * FROM vaccines WHERE NHSNumber = '${NHSNumber}'`, (err, rows) => {
                        if (err) {
                            throw err;
                        }
                        rows.forEach((row1) => {
                            const VaccinationDate = row1.VaccinationDate;
                            const VaccineManufacturer = row1.VaccineManufacturer;
                            const DiseaseTargeted = row1.DiseaseTargeted;
                            const DoseNo = row1.DoseNo;
                            const VaccineType = row1.VaccineType;
                            const Product = row1.Product;
                            const VaccineBatchNumber = row1.VaccineBatchNumber;
                            const CountryOfVaccination = row1.CountryOfVaccination;
                            const Authority = row1.Authority;
                            const Site = row1.Site;
                            const TotalSeriesOfDoses = row1.TotalSeriesOfDoses;
                            const DisplayName = row1.DisplayName;
                            const SnomedCode = row1.SnomedCode;
                            const DateEntered = row1.DateEntered;
                            const ProcedureCode = row1.ProcedureCode;
                            const Booster = row1.Booster;

                            db.run(`INSERT INTO MedicalRecord (NHSNumber, VaccinationDate, VaccineManufacturer, DiseaseTargeted, DoseNo, VaccineType, Product, VaccineBatchNumber,
                CountryOfVaccination, Authority, Site, TotalSeriesOfDoses, DisplayName,SnomedCode, DateEntered, ProcedureCode, Booster)
                VALUES ('${NHSNumber}', '${VaccinationDate}', '${VaccineManufacturer}', '${DiseaseTargeted}', '${DoseNo}', '${VaccineType}', '${Product}',
                '${VaccineBatchNumber}', '${CountryOfVaccination}', '${Authority}', '${Site}', '${TotalSeriesOfDoses}', '${DisplayName}', '${SnomedCode}' ,'${DateEntered}',
                '${ProcedureCode}', '${Booster}')`, function (err) {
                                if (err) {
                                    console.error(err.message);
                                }
                                console.log(`New user MEDICAL RECORD MADE with id ${this.lastID}`);
                                
                            });
                        });
                    });

                    // Store the email and password in the local database
                    if (Regemail.includes("@") && Regemail.includes(".com")) {
                        bcrypt.hash(Regpassword, 10, function (err, hash) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                db.run(`INSERT INTO Users (userEmail, userPassword, userType, NHSNumber, FirstName, Surname, Gender, DoB, Postcode) VALUES ('${Regemail}',
        '${hash}', 'P', ${NHSNumber}, '${fName}', '${sName}', '${gender}', '${DoB}','${post}' )`, function (err) {
                                    if (err) {
                                        console.error(err.message);
                                    } else {
                                        console.log(`New user added with id ${this.lastID}`);
                                        res.json({ success: true });
                                    }
                                });
                            }
                        });

                    } else {
                        console.log("Invalid email format");
                    }
                }
            });
        } else {
            res.json({ success: false });
        }
    });
});

app.post('/register', (req, res) => {
    const { NHS, Regemail, Regpassword, gender, DoB } = req.body;
    

    // Check if the Postcode exists in the database
    vaccineDb.get(`SELECT * FROM patients WHERE NHSNUMBER = ${NHS}`, (err, row) => {
        if (err) {
            throw err;
        }
        if (row) {
            const NHSNumber = row.NHSNumber;
         
            // Check if the email address is already registered for the same NHS number in the Users table
            db.get(`SELECT * FROM Users WHERE NHSNumber = ${NHSNumber}`, (err, user) => {
                if (err) {
                    throw err;
                }
                if (user) {
                    console.log("User already exists");
                    res.json({ success: false });
                } else {
                    vaccineDb.all(`SELECT * FROM vaccines WHERE NHSNumber = '${NHSNumber}'`, (err, rows) => {
                        if (err) {
                            throw err;
                        }
                        rows.forEach((row1) => {
                            const VaccinationDate = row1.VaccinationDate;
                            const VaccineManufacturer = row1.VaccineManufacturer;
                            const DiseaseTargeted = row1.DiseaseTargeted;
                            const DoseNo = row1.DoseNo;
                            const VaccineType = row1.VaccineType;
                            const Product = row1.Product;
                            const VaccineBatchNumber = row1.VaccineBatchNumber;
                            const CountryOfVaccination = row1.CountryOfVaccination;
                            const Authority = row1.Authority;
                            const Site = row1.Site;
                            const TotalSeriesOfDoses = row1.TotalSeriesOfDoses;
                            const DisplayName = row1.DisplayName;
                            const SnomedCode = row1.SnomedCode;
                            const DateEntered = row1.DateEntered;
                            const ProcedureCode = row1.ProcedureCode;
                            const Booster = row1.Booster;



                            db.run(`INSERT INTO MedicalRecord (NHSNumber, VaccinationDate, VaccineManufacturer, DiseaseTargeted, DoseNo, VaccineType, Product, VaccineBatchNumber, CountryOfVaccination, Authority, Site, TotalSeriesOfDoses, DisplayName,SnomedCode, DateEntered, ProcedureCode, Booster) 
                            VALUES ('${NHSNumber}', '${VaccinationDate}', '${VaccineManufacturer}', '${DiseaseTargeted}', '${DoseNo}', '${VaccineType}', '${Product}', '${VaccineBatchNumber}', '${CountryOfVaccination}', '${Authority}', '${Site}', '${TotalSeriesOfDoses}', '${DisplayName}', '${SnomedCode}', '${DateEntered}', '${ProcedureCode}', '${Booster}')`, function (err) {
                                if (err) {
                                    console.error(err.message);
                                }
                                console.log(`New user MEDICAL RECORD MADE with id ${this.lastID}`);
                            });
                        });
                    });

                    // Store the email and password in the local database
                    if (Regemail.includes("@") && Regemail.includes(".com")) {
                        vaccineDb.get(`SELECT * FROM patients WHERE NHSNumber = ${NHSNumber}`, function (err, user) {
                            if (err) {
                                console.error(err.message);
                                res.json({ success: false });
                            } else if (user) {
                                const postcode = user.Postcode;
                                const fname = user.Forename;
                                const sname = user.Surname;

                                bcrypt.hash(Regpassword, 10, function (err, hash) {
                                    if (err) {
                                        console.error(err.message);
                                    } else {
                                db.run(`INSERT INTO Users (userEmail, userPassword, userType, NHSNumber, Gender, DoB, Postcode, FirstName, Surname)
            VALUES ('${Regemail}', '${hash}', 'P', '${NHSNumber}', '${gender}', '${DoB}', '${postcode}', '${fname}', '${sname}')`, function (err) {
                                    if (err) {
                                        console.error(err.message);
                                    } else {
                                        console.log(`New user added with id ${this.lastID}`);
                                        res.json({ success: true });
                                    }
                                });
                                    }
                                });

                              

                    } else {
                        console.log("NHS number not found in vaccines table");
                        res.json({ success: false });
                    }
                });
        } else {
            console.log("Invalid email address");
            res.json({ success: false });
        }
    }
});
} else {
    console.log("NHS number not found in patients table");
    res.json({ success: false });
}
});
});

app.get('/gprecord', (req, res) => {
    const NHSNumber = localStorage.getItem('NHSNumber');

    db.get(`SELECT * FROM Users WHERE NHSNumber = ${NHSNumber}`, (err, row) => {
        if (err) {
            throw err;
        }
        if (row) {
            res.json({ success: true, patients: row });
        } else {
            res.json({ success: false, message: 'Invalid NHS number' });
        }
    });
});

app.post('/gprecordchange', (req, res) => {
    const { FirstName, Surname, Gender, Postcode } = req.body;
    const NHSNumber = localStorage.getItem('NHSNumber');

    db.get(`SELECT * FROM Users WHERE NHSNumber = ${NHSNumber}`, (err, row) => {
        if (err) {
            throw err;
        }
        if (row) {

            db.run(`UPDATE Users SET FirstName = '${FirstName}', Surname = '${Surname}', Postcode = '${Postcode}', Gender = '${Gender}' WHERE NHSNumber = ${NHSNumber}`, function (err) {
                if (err) {
                    throw err;
                }
                console.log(`Changes made.`);


                res.json({ success: true, message: 'Updated.' });
            });

        } else {
            res.json({ success: false, message: 'Invalid NHS number' });
        }
    });
});

app.get('/vaccines', (req, res) => {
    const NHSNumber = localStorage.getItem('NHSNumber');

    db.all(`SELECT * FROM MedicalRecord WHERE NHSNumber =  '${NHSNumber}'`, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            res.json(rows);
        }
    });
});

app.get('/patients', (req, res) => {
    

    db.all(`SELECT NHSNumber, userEmail FROM Users WHERE userType =  'P'`, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            res.json(rows);
        }
    });
});

app.get('/medical-record', (req, res) => {
    const NHSNumber = req.query.NHSNumber;
   

    db.all(`SELECT * FROM MedicalRecord WHERE NHSNumber = '${NHSNumber}'`, (err, rows) => {
        if (err) {
            throw err;
        }

        if (rows.length > 0) {
            res.json(rows);
            
        } else {
            res.json({ message: 'No medical record found for this NHS number.' });
        }
    });
});

app.post('/newMedicalRecord', (req, res) => {
    const {
        NHSNumber,
        VaccinationDate,
        VaccineManufacturer,
        DiseaseTargeted,
        DoseNo,
        VaccineType,
        Product,
        VaccineBatchNumber,
        CountryOfVaccination,
        Authority,
        Site,
        TotalSeriesOfDoses,
        DisplayName,
        SnomedCode,
        DateEntered,
        ProcedureCode,
        Booster
    } = req.body;

    const query = `
    INSERT INTO medicalRecord (
        NHSNumber,
        VaccinationDate,
        VaccineManufacturer,
        DiseaseTargeted,
        DoseNo,
        VaccineType,
        Product,
        VaccineBatchNumber,
        CountryOfVaccination,
        Authority,
        Site,
        TotalSeriesOfDoses,
        DisplayName,
        SnomedCode,
        DateEntered,
        ProcedureCode,
        Booster
    )
    VALUES (
        ${NHSNumber},
        '${VaccinationDate}',
        '${VaccineManufacturer}',
        '${DiseaseTargeted}',
        ${DoseNo},
        '${VaccineType}',
        '${Product.replace(/'/g, "''")}',
        '${VaccineBatchNumber}',
        '${CountryOfVaccination}',
        '${Authority}',
        '${Site}',
        ${TotalSeriesOfDoses},
        '${DisplayName}',
          ${SnomedCode},
        '${DateEntered}',
        '${ProcedureCode}',
        ${Booster}
    )
`;

    db.run(
        query,
        function (err) {
            if (err) {
                console.error(err.message);
                res.json({ success: false, message: err.message });
            } else {
                console.log(`New medical record with ID ${this.lastID} has been added to the database`);

                // Add NHS database update statement here
                const nhsQuery = `
                INSERT INTO vaccines (
                    NHSNumber,
                    VaccinationDate,
                    VaccineManufacturer,
                    DiseaseTargeted,
                    DoseNo,
                    VaccineType,
                    Product,
                    VaccineBatchNumber,
                    CountryOfVaccination,
                    Authority,
                    Site,
                    TotalSeriesOfDoses,
                    DisplayName,
                    SnomedCode,
                    DateEntered,
                    ProcedureCode,
                    Booster
                )
                VALUES (
                    ${NHSNumber},
                    '${VaccinationDate}',
                    '${VaccineManufacturer}',
                    '${DiseaseTargeted}',
                    ${DoseNo},
                    '${VaccineType}',
                    '${Product.replace(/'/g, "''")}',
                    '${VaccineBatchNumber}',
                    '${CountryOfVaccination}',
                    '${Authority}',
                    '${Site}',
                    ${TotalSeriesOfDoses},
                    '${DisplayName}',
                   ${SnomedCode},
                    '${DateEntered}',
                    '${ProcedureCode}',
                    ${Booster}
                )
                `;

                vaccineDb.run(
                    nhsQuery,
                    function (err) {
                        if (err) {
                            console.error(err.message);
                            res.json({ success: false, message: err.message });
                        } else {
                            console.log(`New medical record with ID ${this.lastID} has been added to the NHS database`);
                            res.json({ success: true, message: 'New medical record has been added to both databases' });
                        }
                    }
                );
            }
        }
    );
});

app.post('/deregister', (req, res) => {
    const NHSNumber = localStorage.getItem('NHSNumber');
    if (NHSNumber) {
        // Check if the user is a patient
        db.get(`SELECT * FROM Users WHERE userType = 'P' AND NHSNumber = '${NHSNumber}'`, (err, row) => {
            if (err) {
                throw err;
            }
            if (row) {
                // Delete the user from the database
                db.run(`DELETE FROM Users WHERE NHSNumber = '${NHSNumber}'`, function (err) {
                    if (err) {
                        throw err;
                    }
                    console.log(`Deleted user with NHSNumber ${NHSNumber}`);
                    // send user back to login page after
                    res.json({ success: true });
                    localStorage.clear();
                });

                db.get(`SELECT * FROM Appointments WHERE NHSNumber = '${NHSNumber}'`, (err, row) => {
                    if (err) {
                        throw err;
                    }
                    if (row) {
                        // Delete the user's appointments from the database
                        db.run(`DELETE FROM Appointments WHERE NHSNumber = '${NHSNumber}'`, function (err) {
                            if (err) {
                                throw err;
                            }
                            console.log(`Deleted appointments for user with NHSNumber ${NHSNumber}`);
                        });
                    }
                });
                db.get(`SELECT * FROM MedicalRecord WHERE NHSNumber = '${NHSNumber}'`, (err, row) => {
                    if (err) {
                        throw err;
                    }
                    if (row) {
                        // Delete the user's appointments from the database
                        db.run(`DELETE FROM MedicalRecord WHERE NHSNumber = '${NHSNumber}'`, function (err) {
                            if (err) {
                                throw err;
                            }
                            console.log(`Deleted MedicalRecord for user with NHSNumber ${NHSNumber}`);
                        });
                    }
                });

            } else {
                // User is not a patient or NHSNumber doesn't match
                res.json({ success: false, message: 'User not authorized to deregister' });
            }
        });
    } else {
        // User is not logged in
        res.json({ success: false, message: 'User not logged in' });
    }
});

app.post('/bookings', (req, res) => {
    const { selectedDate, selectedTime } = req.body;
    const NHSNumber = localStorage.getItem('NHSNumber');

    // Check if the NHS number exists in the database
    vaccineDb.get(`SELECT * FROM patients WHERE NHSNumber = ${NHSNumber}`, (err, row) => {
        if (err) {
            throw err;
        }
        if (row) {
            const postcode = row.Postcode;
           

            // Get a random doctor from the Users table
            db.get(`SELECT * FROM Users WHERE userType = 'D' ORDER BY RANDOM() LIMIT 1`, (err, user) => {
                if (err) {
                    throw err;
                }
                const doctorLicense = user.MedicalLicense;
                const doctorfname = user.FirstName;
                const doctorlname = user.Surname;

                

                // Check if the date and time are available
                db.all(`SELECT * FROM Appointments a 
          JOIN Users u ON a.DoctorLicense = u.MedicalLicense 
          WHERE a.date = '${selectedDate}' 
          AND a.time = '${selectedTime}' 
          AND a.postcode = '${postcode}' 
          AND u.userType = 'D' 
          AND u.MedicalLicense <> '${doctorLicense}'`, (err, rows) => {
                    if (err) {
                        throw err;
                    }
                    if (rows.length > 0) {
                        res.json({ success: false, message: 'The selected appointment is already booked' });
                    } else {
                        // Insert the appointment into the database

                        db.run(`INSERT INTO Appointments (date, time, NHSNumber, postcode, DoctorLicense, ID) VALUES ('${selectedDate}', '${selectedTime}', '${NHSNumber}', '${postcode}', '${user.MedicalLicense}', NULL)`, function (err) {
                            if (err) {
                                // If the appointment already exists, return an appropriate error message
                                if (err.message.includes('UNIQUE constraint failed')) {
                                    res.json({ success: false, message: 'The selected appointment has already been booked' });
                                } else {
                                    throw err;
                                }
                            }
                            console.log(`Appointment inserted with id ${this.lastID}`);

                            // Retrieve the doctor's information using their MedicalLicense
                            db.get(`SELECT * FROM Users WHERE MedicalLicense = '${user.MedicalLicense}'`, (err, doctor) => {
                                if (err) {
                                    throw err;
                                }
                                

                                if (!res.headersSent) {
                                    res.json({ success: true, message: `Appointment booked with Dr. ${doctorfname} ${doctorlname} on ${selectedDate} at ${selectedTime}`, doctor });
                                }
                            });
                        });
                    }
                });
            });
        } else {
            if (!res.headersSent) {
                res.json({ success: false, message: 'Invalid NHS number' });
            }
        }
    });
});

app.get('/appointments', (req, res) => {
    db.all(`SELECT * FROM Appointments`, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            res.json(rows);
        }
    });
});

app.delete('/appointments', (req, res) => {
    const { id } = req.body;
   
    db.run(`DELETE FROM Appointments WHERE id = ${id}`, function (err) {
        if (err) {
            console.error(err.message);
            res.json({ success: false, message: 'Error deleting appointment' });
        } else {
            console.log(`Appointment deleted with id ${id}`);
            res.json({ success: true, message: 'Appointment deleted successfully' });
        }
    });
});

app.get('/patientappointments', (req, res) => {
    const NHSNumber = localStorage.getItem('NHSNumber');

    db.all(`SELECT * FROM Appointments WHERE nhsNumber = '${NHSNumber}'`, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            res.json(rows);
        }
    });
});

app.get('/doctorappointments', (req, res) => {
    

    
    const med = localStorage.getItem('medical');
   
    db.all(`SELECT * FROM Appointments WHERE DoctorLicense = '${med}'`, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            res.json(rows);
        }
    });
});

app.get('/doctorwelcome', (req, res) => {



    const med = localStorage.getItem('medical');

    db.all(`SELECT * FROM Users WHERE MedicalLicense = '${med}'`, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            res.json(rows);
        }
    });
});


app.listen(4000, () => {
    console.log(`Server started on port 4000`);
});
