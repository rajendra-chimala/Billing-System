const express = require('express');
const dbConnection = require('./Database/DB_Connection');
require('dotenv').config();
const port = process.env.PORT;


// Connect to MongoDB database
dbConnection();


const app = express();
app.use(express.json());

app.use('/biller/api', require('./Routes/User'));
app.use('/biller/api', require('./Routes/Store'));



app.listen(port,()=>{
    console.log(`Server is running on port ${port} !`);
})