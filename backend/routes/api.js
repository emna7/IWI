const express = require('express');
const gigsRouter = require('./gigs');
const clubsRouter = require('./clubs');
const usersRouter = require('./users');
const commentsRouter = require('./comments');

const apiRouter = express.Router();

apiRouter.use('/gigs', gigsRouter);
apiRouter.use('/clubs', clubsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/comments', commentsRouter);
module.exports = apiRouter;
