const router = require('express').Router();

const homeRoute = require('./home-routes');
const dashboardRoute = require('./dashboard-route');

router.use('/', homeRoute);
router.use('/',dashboardRoute);