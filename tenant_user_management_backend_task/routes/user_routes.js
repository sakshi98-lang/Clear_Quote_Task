const express = require('express')
const router = express.Router();
const user_controller = require('../controllers/user_controller')
const roles_controller = require('../controllers/roles_controller')
const authenticate = require('../middlewares/authenticate')

router.post('/login',user_controller.user_login)

router.post('/roles',roles_controller.roles)


 
module.exports = router;