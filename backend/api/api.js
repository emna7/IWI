const express = require('express');
const gigsRouter = require('./gigs');
const clubsRouter = require('./clubs');
const usersRouter = require('./users');

const apiRouter = express.Router();

apiRouter.use('/gigs', gigsRouter);
apiRouter.use('/clubs', clubsRouter);
apiRouter.use('/users', usersRouter);
module.exports = apiRouter;
