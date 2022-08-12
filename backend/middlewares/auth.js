const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');

module.exports.checkToken = async (req, res, next) => {
    console.log("checkToken");

    if (!req.headers || !req.headers['authorization']) {
        return res.status(401).send({ auth: false, message: 'No token provided' });
    }

    const token = req.headers['authorization'];
    jwt.verify(token, 'SECRET', function (err, decoded) {
        console.log(decoded);
        if (err) {
            console.log(err);
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        req.user = decoded;
        next();
    })
}

module.exports.authEmployer = async (req, res, next) => {
    console.log('authEmployer');

    if (!req.user || req.user.role !== 'employer') {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate employer.' });
    }
    next();
}

module.exports.authSeeker = async (req, res, next) => {
    console.log('authSeeker');

    if (!req.user || req.user.role !== 'seeker') {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate seeker.' });
    }
    next();
}