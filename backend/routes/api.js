const express = require('express');
const gigsRouter = require('./gigs');
const clubsRouter = require('./clubs');
const eventsRouter = require('./events');
const usersRouter = require('./users');
const commentsRouter = require('./comments');
const imagesRouter = require('./images');

const apiRouter = express.Router();

apiRouter.use('/gigs', gigsRouter);
apiRouter.use('/clubs', clubsRouter);
apiRouter.use('/events', eventsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.use('/images', imagesRouter);

module.exports = apiRouter;
