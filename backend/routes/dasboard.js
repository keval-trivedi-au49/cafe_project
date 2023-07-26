const express = require('express');
const connection=require('../dbConnection');
const getdetails = require('../controllers/dashboardctrl.js');
const router = express.Router();

router.get('/details', getdetails)

module.exports = router;