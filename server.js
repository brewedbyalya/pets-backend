const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');

// Middleware
app.use(express.json());
app.use(logger('dev'));

// Require controllers
const petRouter = require('./controllers/pets.js');

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

//Routes
app.use('/pets', petRouter);

app.listen(3000, () => {
  console.log('The express app is ready!');
});