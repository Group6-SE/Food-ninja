const express = require('express');
const {getMenu} = require('../../controller/customer/menu')
const router = express.Router();
const {pool} = require('../../startup/mysql_database');
const _ = require('lodash');
const path = require('path');


router.get('/view',getMenu );



module.exports = router;



