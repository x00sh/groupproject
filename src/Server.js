const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

let db = new sqlite3.Database('local.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    // Check if the email exists in the database
    db.all(`SELECT * FROM Users WHERE userEmail = '${email}' && userPasword = '${passoword}`, (err, rows) => {
        if (err) {
            throw err;
        }
        if (rows.length > 0) {
            const userType = rows[0].userType;
            res.send({ validation: true, userType });
            console.log(userType);
        } else {
            res.send({ validation: false });
        }

    });
});

app.listen(4000, () => {
    console.log(`Server started on port 4000`);
});
