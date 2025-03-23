const express = require('express');
const dbConnection = require('./Database/DB_Connection');
require('dotenv').config();
const port = process.env.PORT;
const cors = require('cors');


// Connect to MongoDB database
dbConnection();


const app = express();
app.use(express.json());
app.use(cors());

app.use('/biller/api', require('./Routes/User'));
app.use('/biller/api', require('./Routes/Store'));
app.use('biller/api', require('./Routes/Bill'));
app.use('biller/api', require('./Routes/Products'));
app.get('/',(req,res)=>{
res.end(`<h1>The Server is Running ...!</h1>`);
});



app.listen(port,()=>{
    console.log(`Server is running on port ${port} !`);
})
