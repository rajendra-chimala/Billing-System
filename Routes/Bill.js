const express = require('express');
const router = express.Router();
const { deleteBill, updateBill, getBillsByStoreID, createBill } = require('../Controller/Bill');
const authenticate = require('../Middlewares/Auth');

router.post('/bills',authenticate, createBill);

router.get('/bills/store/:storeID', authenticate,getBillsByStoreID);

router.put('/bills/:billID', updateBill);

router.delete('/bills/:billID', deleteBill);

module.exports = router;
