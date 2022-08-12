//config
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const jobRouter = require('./routes/jobRouter');
const userRouter = require('./routes/userRouter');
const seekerRouter = require('./routes/seekerRouter');
const employerRouter = require('./routes/employerRouter');
const utilRouter = require('./routes/utilRouter');
const dotenv = require("dotenv");

//app
const app = express();

//middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//route
app.use('/jobs', jobRouter);
app.use('/users', userRouter);
app.use('/employers', employerRouter);
app.use('/seekers', seekerRouter);
app.use('/utils', utilRouter);

app.use((req, res, next) => {
    next(new Error('Route Not Found'));
});

app.use((err, req, res, next) => {
    res.status(500).json({ error: err });
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
    mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zzi3uw2.mongodb.net/myJobPortal`, {useNewUrlParser: true});
});