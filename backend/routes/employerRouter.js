const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const auth = require('../middlewares/auth');
const employerController = require("../controllers/employerController");

/*
    JOBS of an employer: Job with full info
*/

//host:/employers/jobs             get all jobs with queries
router.get('/jobs', auth.checkToken, auth.authEmployer, jobController.getEJobs);

//host:/employers/jobs/:job_id     get a job
router.get('/jobs/:job_id', auth.checkToken, auth.authEmployer, jobController.getEJobById);

//host:/employers/jobs/:job_id     update a job
router.patch('/jobs/:job_id', auth.checkToken, auth.authEmployer, jobController.updateEJobById);

//host:/employers/jobs             create a job
router.post('/jobs/', auth.checkToken, auth.authEmployer, jobController.createEJob);

/*
    EMPLOYER
 */
//host/employers/:employer_id       get employer info
router.get('/:employer_id', auth.checkToken, auth.authEmployer, employerController.getEmployerById);

//host/employers/:employer_id       update employer info
router.patch('/:employer_id', auth.checkToken, auth.authEmployer, auth.authEmployer, employerController.updateEmployerById);

module.exports = router;