const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.json());

const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    database: 'history',
    port:3306
})

connection.connect((err) => {
    if(err){
        console.log('eror',err);
        return;
    }
    console.log('MySQl successfully connected');
})

app.post("/create", async(req,res) => {
    const {x,fx} = req.body;
    try {

        connection.query(
            "INSERT INTO newtoninterpolate_db (x, fx) VALUES (?, ?)",
            [x,fx], // Pass the array of values

            (err, result, fields) => {
                if (err) {
                    console.log("Error when adding x, fx to the database", err);
                    return res.status(400).send();
                }
                return res.status(201).json({ message: "Added successfully"+x});
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})


app.listen(3001,() =>console.log('Server is run'));
