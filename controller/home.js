const express = require('express');
const path = require('path');
const router = express.Router();
const isLoggedIn = require('../middleware/login');

router.get('/',(request, response) => {
    // this route will only execute if user is logged in
    if (request.privilege_level == 1) {
        return response.sendFile(path.join(__dirname, '../views/manager/home.html'));
    }
    if (request.privilege_level == 2) {
        return response.sendFile(path.join(__dirname, '../views/employee/home.html'));
    }
    if (request.privilege_level == 3) {
        return response.sendFile(path.join(__dirname, '../views/customer/home.html'));
    }
    if (request.privilege_level == 4) {
        return response.sendFile(path.join(__dirname, '../views/driver/home.html'));
    }
});

module.exports = router;