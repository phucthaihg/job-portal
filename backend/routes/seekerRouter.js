const express = require('express');
const router = express.Router();
const seekerController = require('../controllers/seekerController');

/**************** SEEKER ************************** */
//update seeker
//router.get('/seekers/:seeker_id', auth.authSeeker, seekerController.getSeekerById);
router.get('/:seeker_id', seekerController.getSeekerById);

//create new seeker
router.post('/', seekerController.createSeeker);

//update seeker
//router.patch('/seekers/:seeker_id', auth.authSeeker, seekerController.updateSeekerById);
router.patch('/:seeker_id/', seekerController.updateSeekerById);


router.patch('/job/:job_id', seekerController.applyJob);

router.get('/my-job/:email', seekerController.getMyJobs);

module.exports = router;