const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');
const authRouter = require('./controllers/auth.routes');
const restaurantRouter = require('./controllers/restaurant.routes');
const menuItemRouter = require('./controllers/menuItem.routes');



const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
mongoose.connect(mongoUri);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Routes go here
app.use('/auth', authRouter);
app.use('/restaurants', restaurantRouter);
app.use('/restaurants', menuItemRouter);



app.listen(process.env.PORT || 3000, () => {
  console.log('The express app is ready!');
});
