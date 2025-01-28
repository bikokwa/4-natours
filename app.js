const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// express() will add a bunch of methods to app
const app = express();

// MIDDLEWARES
// log request object information to console
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// adds data send in the body to the request object
app.use(express.json());
// serve static files
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
  next();
});

module.exports = app;
