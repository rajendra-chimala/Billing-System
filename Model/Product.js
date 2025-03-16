const mongoose   = require('mongoose');

const productSchema = new mongoose.Schema({


    productName:{
        type: String,
        required: true
    },
    productImage:{
        type: String,
        required: true
    },
    productPrice:{
        type: Number,
        required: true
    },
    productQuantity:{
        type: Number,
        required: true
    },
    storeID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);