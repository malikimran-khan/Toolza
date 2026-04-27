const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: 'Not authorized. Please log in to use this service.' 
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_super_secret_jwt_key_123');
        req.user = { id: decoded.id };
        next();
    } catch (error) {
        return res.status(401).json({ 
            success: false, 
            message: 'Session expired or invalid. Please log in again.' 
        });
    }
};

module.exports = { protect };
