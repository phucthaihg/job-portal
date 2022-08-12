const express = require('express');
const utilController = require('../controllers/utilController');

const router = express.Router();


//for testing purpuse
router.post('/location', utilController.createLocationDb);

router.get('/location', utilController.getCountries);

router.get('/location/:country_id', utilController.getStates);

router.get('/location/:country_id/:state_id', utilController.getCities);

module.exports = router;