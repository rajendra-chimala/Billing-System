const express = require('express');
const router = express.Router();
const { createStore, getAllStores, getStoresByUserId, updateStore, deleteStore } = require('../Controller/Store');
const authenticate = require('../Middlewares/Auth');

router.post('/stores',authenticate, createStore);

router.get('/stores', getAllStores);

router.get('/stores/user/:userID',authenticate, getStoresByUserId);

router.put('/stores/:storeId',authenticate, updateStore);

router.delete('/stores/:storeId',authenticate, deleteStore);

module.exports = router;
