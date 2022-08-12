const Location = require('../models/locationModel');

//For testing purpose
module.exports.createLocationDb = async function (req, res, next) {
    console.log("createLocationDb");
    try {
        console.log(req.body);
        await Location.create(req.body);
        res.json({success: 1});
    } catch (error) {
        next(error);
    }
}

module.exports.getCountries = async function (req, res, next) {
    console.log("getCountries");
    try {
        const results = await Location.find();
        res.json(results);
    } catch (error) {
        next(error);
    }
}

module.exports.getStates = async function (req, res, next) {
    console.log("getStates");
    const {country_id} = req.params;
    try {
        const results = await Location.find({_id: country_id})
            .project({"states.name": 1});
        res.json(results);
    } catch (error) {
        next(error);
    }
}

module.exports.getCities = async function (req, res, next) {
    console.log("getCities");
    const {country_id, state_id} = req.params;
    try {
        const results = await Location.find({_id: country_id, "states._id": state_id})
            //.project({"states.cities.name": 1});
        console.log("results: ", results);
        res.json(results);
    } catch (error) {
        next(error);
    }
}
