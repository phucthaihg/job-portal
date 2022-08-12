const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const EmployerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    fullname: String,
    organization: String,
    location: {
        address: String,
        city: String,
        state: String,
        country: String
    }
});

EmployerSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash;
        next();
    });
});

EmployerSchema.plugin(uniqueValidator);

module.exports =
    mongoose.models.Employer || mongoose.model('Employer', EmployerSchema);