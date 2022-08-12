const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    name: String,
    states: [
        {   name: String,
            cities: [{type: String}] }
    ]
});

module.exports =
    mongoose.models.Location || mongoose.model('Location', LocationSchema);