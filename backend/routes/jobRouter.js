const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

/*
* Job with public info will be sent to guest / seekers
* */

//host:/jobs                get all jobs with queries
router.get('/', jobController.getAllJobs);

router.get('/search', jobController.search);

//get a job
//host:/jobs/:job_id        get all jobs with queries
router.get('/:job_id', jobController.getJobById);

//test DB
router.post('/test', jobController.createJobs);

module.exports = router;