 const mongoose = require('mongoose');
require('dotenv').config();

 const dbConnection = async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('Connected to MongoDB...');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
 }

 module.exports = dbConnection;