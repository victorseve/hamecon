var express = require('express');
var router = express.Router();

var user_controller = require('../controller/user');

/// USER ROUTES ///

// GET user create.
router.get('/login', user_controller.user_login_get);
router.post('/login', user_controller.user_login_post);
router.get('/change_password', user_controller.user_new_password_get);
router.post('/change_password', user_controller.user_new_password_post);
router.post('/login', user_controller.user_login_post);
router.get('/logout', user_controller.user_logout_get);

module.exports = router;
