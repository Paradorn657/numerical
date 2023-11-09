const cors = require("cors")
const bodyParser = require("body-parser")

const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(cors());

app.use(express.json());

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'history',
    port: 3306
})

connection.connect((err) => {
    if (err) {
        console.log('eror', err);
        return;
    }
    console.log('MySQl successfully connected');
})

app.post("/create", async (req, res) => {
    const { Xmatrix, Ymatrix } = req.body;
    console.log(Xmatrix);
    console.log(Ymatrix);
    try {

        connection.query(
            "INSERT INTO newtoninterpolate_db (x, fx) VALUES (?, ?)",
            [JSON.stringify(Xmatrix), JSON.stringify(Ymatrix)], // Pass the array of values

            (err, result, fields) => {
                if (err) {
                    console.log("Error when adding x, fx to the database", err);
                    return res.status(400).send();
                }
                return res.status(201).json({ message: "Added successfully" });
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

app.get("/get", async (req, res) => {
    try {

        connection.query(
            "SELECT * FROM `newtoninterpolate_db`",
            (err, result, fields) => {
                if (err) {
                    console.log("Error when adding x, fx to the database", err);
                    return res.status(400).send();
                }
                console.log(result)
                return res.status(201).json(result);
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})


app.get("/getMutidata", async (req, res) => {
    try {
        connection.query(
            "SELECT * FROM `muti_db`",
            (err, result, fields) => {
                if (err) {
                    console.log("Error when geting x, fx from the database", err);
                    return res.status(400).send();
                }
                console.log(result)
                return res.status(201).json(result);
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})







app.get("requestdata", async (req, res) => {

    connection.query("",

        (err, result) => {
            if(err){

            }
            return res.status(201).json(result);


        }

    );



})


















app.listen(3001, () => console.log('Server is run'));
