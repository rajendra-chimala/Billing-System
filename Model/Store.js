const mongoose = require('mongoose');


const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    ownerName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    contact:{
        type: String,
        required: true
    },
   userID:{
       type: mongoose.Schema.Types.ObjectId,
        required:true
   }
})

module.exports = mongoose.model('Store', storeSchema);