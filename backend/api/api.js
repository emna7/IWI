const express = require('express');
const gigsRouter = require('./gigs')

const apiRouter = express.Router();

apiRouter.use('/gigs', gigsRouter);
module.exports = apiRouter;
