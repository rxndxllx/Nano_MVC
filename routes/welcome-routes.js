const express = require('express');
const router = express.Router();

/*
|   Import the controller
*/
const WelcomeController = require('../system/Controller');

/*
|   Set the routes for the controller
*/
router.get('/', WelcomeController.index);

module.exports = router;
