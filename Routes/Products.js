const express = require('express');
const router = express.Router();
const authenticate = require('../Middlewares/Auth');
const { createProduct, getAllProducts, updateProduct, deleteProduct } = require('../Controller/Product');

router.post('/add', authenticate,createProduct);

router.get('/all/products',getAllProducts );

router.put('/update/:productId',updateProduct );

router.delete('/delete/:productId',deleteProduct);

module.exports = router;
