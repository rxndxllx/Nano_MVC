const express = require('express');
const router = express.Router();


const Validations = require('../utils/validations');
/*
|   Import the controller
*/
const UsersController = require('../controllers/Users');

/*
|   Set the routes for the controller
*/
router.get('/', UsersController.index);
router.post('/register', Validations, UsersController.register);
router.post('/login', UsersController.login);
router.get('/students/profile', UsersController.profile);
router.post('/logoff', UsersController.logoff);

module.exports = router;
