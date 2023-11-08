const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    database: 'history'
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
        
    } catch (error) {
        connection.query(
            "INSERT INTO newtoninterpolate_db()"
        )
        
    }
})


app.listen(3001,() =>console.log('Server is run'));
