const User = require('../Model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET_KEY; // Change this

// Register User with Profile Image
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const profileImage = req.file ? req.file.filename : null; 

       
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const newUser = new User({
            username,
            email,
            profileImage,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully',newUser });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get User by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Convert image filename to full URL
        const profileImageUrl = `${req.protocol}://${req.get('host')}/uploads/${user.profileImage}`;

        res.status(200).json({ ...user.toObject(), profileImage: profileImageUrl });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const getAll = async (req, res) => {
    try {
        const users = await User.find();

       
        const usersWithProfileImages = users.map(user => ({
            ...user.toObject(),
            profileImage: `${req.protocol}://${req.get('host')}/uploads/${user.profileImage}`
        }));

        res.status(200).json(usersWithProfileImages);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { getAll,loginUser,getUserById,registerUser}