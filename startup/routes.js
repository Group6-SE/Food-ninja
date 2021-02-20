const express = require('express');
const routes = require('../routes');
const path = require('path');
const config = require('config');

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
var uuid = require('node-uuid');

module.exports = function (app) {

    app.use(express.json());

    const options = {
        user: config.get("user"),
        host: config.get("host"),
        password: config.get("password"),
        port: config.get("port"),
        database: config.get("database")
    }

    app.use(session({
        genid: (req) => {
            // console.log('Inside the session middleware')
            // console.log(req.sessionID)
            return uuid() // use UUIDs for session IDs
        },
        secret: config.get('jwtPrivateKey'),
        resave: false,
        store: new MySQLStore(options),
        saveUninitialized: false,
        cookie: {
            maxAge: 1000*60*60
        }
    }));


    
    app.use(express.urlencoded({ extended: true }));

    app.set('views', path.join(__dirname, '../views'));

    app.use(express.static('public'));

    //view engine setup
    app.set('view engine', 'ejs');
    app.engine('html',require('ejs').renderFile);
    app.use('/', routes);
}