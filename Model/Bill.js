const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({

    storeID:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    customerName:{
        type: String,
        required: true
    },
   
    items:[{
       productID:{
            type: mongoose.Schema.Types.ObjectId,
            required: true
       },
        quantity:{
            type: Number,
            required: true
        }
    }],
    totalAmount:{
        type: Number,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }

});

const Bill = mongoose.model('Bill', billSchema);