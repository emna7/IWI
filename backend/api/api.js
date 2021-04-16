const express = require('express');
const gigsRouter = require('./gigs')
const clubsRouter = require('./clubs')

const apiRouter = express.Router();

apiRouter.use('/gigs', gigsRouter);
apiRouter.use('/clubs', gigsRouter);
module.exports = apiRouter;
