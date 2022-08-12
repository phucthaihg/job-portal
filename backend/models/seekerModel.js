const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const SeekerSchema = new mongoose.Schema({
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
    resume: String,     ///public/src/files/abcd.pdf
    education: String,  //master / bachelor
    skill_set: [{type: String}],
    yoe: Number,
    status: String //[active, inactive]
});

SeekerSchema.pre('save', function (next) {
    const user = this
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash
        next()
    })
});

SeekerSchema.plugin(uniqueValidator);

module.exports =
    mongoose.models.Seeker || mongoose.model('Seeker', SeekerSchema);