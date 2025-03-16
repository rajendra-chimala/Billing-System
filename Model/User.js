const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    profileImage:{
        type: String,
       required:true
        
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    },
    storeID:{
        type: mongoose.Schema.Types.ObjectId,
    }

});

module.exports = mongoose.model('User', userSchema);