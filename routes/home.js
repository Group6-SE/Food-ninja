const express = require('express');
const path = require('path');
const { logout } = require('../controller/logout');
const router = express.Router();
const isLoggedIn = require('../middleware/login');

router.get('/', [isLoggedIn], (request, response) => {
    // this route will only execute if user is logged in
    if (request.privilege_level == 1) {
        return response.render('manager/home.html');
    }
    if (request.privilege_level == 2) {
        return response.render('employee/home.html');
    }
    if (request.privilege_level == 3) {
        return response.render('customer/home.html');
    }
    if (request.privilege_level == 4) {
        return response.render('driver/home.html');
    }
})

module.exports = router;