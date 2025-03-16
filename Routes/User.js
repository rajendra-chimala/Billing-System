const express = require('express');

const upload = require('../Middlewares/Uploads'); 
const { getAll, loginUser, getUserById, registerUser } = require('../Controller/User.js');

const router = express.Router();

router.post('/register', upload.single('profileImage'), registerUser);
router.post('/login', loginUser);
router.get('/:id', getUserById);
router.get('/all/users',getAll)

module.exports = router;
