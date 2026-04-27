const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'your_super_secret_jwt_key_123', {
        expiresIn: '30d',
    });
};

exports.googleLogin = async (req, res) => {
    const { idToken } = req.body;
    if (!idToken) {
        return res.status(400).json({ success: false, message: 'Google ID Token is required' });
    }

    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const { name, email, sub: googleId } = ticket.getPayload();

        let user = await User.findOne({ email });

        if (!user) {
            // Create user if not exists (password is random for google users)
            user = await User.create({
                name,
                email,
                password: Math.random().toString(36).slice(-16), // Random password
            });
        }

        res.json({
            success: true,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            }
        });
    } catch (error) {
        console.error('Google Auth Error:', error);
        res.status(401).json({ success: false, message: 'Google authentication failed' });
    }
};


exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Please provide all fields' });
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });
    res.status(201).json({
        success: true,
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        }
    });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    res.json({
        success: true,
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        }
    });
};

exports.verify = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'No token' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_super_secret_jwt_key_123');
        const user = await User.findById(decoded.id);
        if (!user) return res.status(401).json({ success: false, message: 'User not found' });

        res.json({
            success: true,
            data: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
};
