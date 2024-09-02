const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET_KEY;

if (!secretKey) {
    throw new Error('JWT_SECRET_KEY não está definido.');
}

const gerarToken = (userId) => {
    return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
};

module.exports = { gerarToken };
