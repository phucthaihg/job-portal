const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const JobSchema = new mongoose.Schema({
    title: String,
    description: String,
    skills: [{ type: String }],
    job_type: String,
    location: {
        address: String,
        city: String,
        state: String,
        country: String
    },
    salary: String,
    timestamp_created: { type: Number, default: Date.now() },
    created_by: String,
    employer: {
        _id: mongoose.Types.ObjectId,
        email: String,
        fullname: String,
        organization: String
    },
    applied_by: [
        {
            _id: mongoose.Types.ObjectId,
            email: String,
            fullname: String,
            resume: String,
            education: String,              //master / bachelor
            skill_set: [{ type: String }],  //[Java, NodeJS, Angula]
            yoe: Number,
            status: String                  //submited, viewed, rejected, hired
        },
    ],
    status: String                          //active/ inactive
});

JobSchema.plugin(mongoosePaginate);

module.exports =
    mongoose.models.Job || mongoose.model('Job', JobSchema);
