const Employer = require('../models/employerModel');
const Seeker = require('../models/seekerModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

module.exports.getEmployerById = async function (req, res, next) {
    console.log("getEmployerById");
    try {
        const { employer_id } = req.params;
        console.log(employer_id);
        const results = await Employer.findById(employer_id);
        res.json(results);
    } catch (error) {
        next(error);
    }
}

module.exports.updateEmployerById = async function (req, res, next) {
    console.log("updateEmployerById");
    try {
        const { employer_id } = req.params;
        const employer = req.body;
        const results = await Employer.updateOne(
            { _id: employer_id },
            { $set: employer });
        res.json(results);
    } catch (error) {
        next(error);
    }
}

module.exports.createEmployer = async function (req, res, next) {
    console.log("createEmployer");
    try {
        const employer = req.body;
        const results = await Employer.create(employer);
        res.json(results);
    } catch (error) {
        next(error);
    }
}

module.exports.createEmployers = async function (req, res, next) {
    console.log("createEmployers");
    try {
        const employers = req.body;
        employers.forEach(employer => {
            console.log(employer);
            Employer.create(employer);
        });
        res.json({ success: 1 });
    } catch (error) {
        next(error);
    }
}

module.exports.signup = async function (req, res, next) {
    try {
        const {role, email, password, fullname, education, skills, yoe, organization, address, city, state, country} = req.body;
        if(role === 'seeker') {
            const skill_set = skills.split(',').map(s => s.trim());
            if(req.files && req.files.length > 0) {
                let stream = cloudinary.uploader.upload_stream(
                    {}, async (error, result) => {
                        if(result) {
                            const {url, secure_url} = result;
                            console.log(url, secure_url);
                            let resume = url;
                            const status = 'Active';
                            const seekerObj = {email, password, fullname, education, skill_set, yoe, resume, status};
                            const seeker = await Seeker.create(seekerObj);
                            const obj = { user_id: seeker._id, fullname: seeker.fullname, email: seeker.email, role: "seeker" };
                            const token = jwt.sign(obj, 'SECRET');
                            return res.status(200).json({ token: token });
                        } else {
                            next(error);
                        }
                    }
                );
                streamifier.createReadStream(req.files[0].buffer).pipe(stream);
            } else {
                let resume = '';
                const skill_set = skills.split(',');
                const seekerObj = {email, password, fullname, education, skill_set, yoe, resume};
                const seeker = await Seeker.create(seekerObj);
                const obj = { user_id: seeker._id, fullname: seeker.fullname, email: seeker.email, role: "seeker" };
                const token = jwt.sign(obj, 'SECRET');
                return res.status(200).json({ token: token });
            }

        } else {
            const location = {
                address,
                city,
                state,
                country
            }
            const employer = await Employer.create({email, password, fullname, organization, location});
            const token = jwt.sign({ user_id: employer._id, fullname: employer.fullname, email: employer.email, role: "employeer" }, 'SECRET');
            return res.status(200).json({ token: token });
        }
    } catch (error) {
        next(error);
    }
}
