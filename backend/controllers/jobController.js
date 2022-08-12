const Job = require('../models/jobModel');

module.exports.getAllJobs = async function (req, res, next) {
    console.log("getAllJobs");
    try {
        const results = await Job.find()
            .project({title: 1, description: 1, skills: 1, job_type: 1, location: 1, timestamp_created: 1,
                created_by: 1, "employer.fullname": 1, "employer.organization": 1});
        res.json(results);
    } catch (error) {
        next(error);
    }
}

module.exports.getJobById = async function (req, res, next) {
    console.log("getJobById");
    try {
        const { job_id } = req.params;
        const results = await Job.findById(job_id)
            .project({title: 1, description: 1, skills: 1, job_type: 1, location: 1, timestamp_created: 1,
                created_by: 1, "employer.fullname": 1, "employer.organization": 1});
        res.json(results);
    } catch (error) {
        next(error);
    }
}

module.exports.getEJobs = async function (req, res, next) {
    console.log("getEJobs");
    try {
        if (!req.user || req.user.role !== 'employer') {
            console.log()
            return res.status(500).send({ auth: false, message: 'Failed to authenticate employer.' });
        }
        console.log(req.user.user_id);
        const results = await Job.find(
            { "employer._id": req.user.user_id }
        );

        console.log(results);
        res.json(results);
    } catch (error) {
        next(error);
    }
}

module.exports.getEJobById = async function (req, res, next) {
    console.log("getEJobById");
    try {
        const { job_id } = req.params;
        const results = await Job.findById(job_id);
        res.json(results);
    } catch (error) {
        next(error);
    }
}

module.exports.updateEJobById = async function (req, res, next) {
    console.log("updateEJobById");
    try {
        const { job_id } = req.params;
        const job = req.body;
        const results = await Job.updateOne(
            { _id: job_id },
            { $set: job });
        res.json(results);
    } catch (error) {
        next(error);
    }
}

module.exports.createEJob = async function (req, res, next) {
    console.log("createEJob");
    try {
        const job = req.body;
        const results = await Job.create(job);
        res.json(results);
    } catch (error) {
        next(error);
    }
}


//For testing purposes
module.exports.createJobs = async function (req, res, next) {
    console.log("createJobs");
    try {
        const jobs = req.body;
        const results = await Job.insertMany(jobs);
        res.json({ success: 1 });
    } catch (error) {
        next(error);
    }
}

module.exports.search = async function (req, res, next) {

    try {
        const { keyword, city, state, page } = req.query;
        const options = {
            page: parseInt(page),
            limit: 10
        };
        let result;
        if(city && state) {

            result = await Job.paginate({$and: [{"location.city": city}, {"location.state": state}],
                $text: {$search: keyword}}, options);

        } else if(city) {
            result = await Job.paginate({"location.city": city , $text: {$search: keyword}}, options);
        } else if(state) {
            results = await Job.find({"location.state": state , $text: {$search: keyword}});
        } else if(keyword) {
            result = await Job.paginate({$text: {$search: keyword}}, options);
        } else {
            result = await Job.paginate({}, options);
        }
        res.json({data: result.docs, total: result.totalDocs});
    } catch (error) {
        next(error);
    }
}