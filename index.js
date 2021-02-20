const express = require('express');
const app = express();
const config = require('config');

require('./startup/routes')(app); 

const dotenv = require('dotenv');

dotenv.config({
    path: './config/config.env'
});

const port = process.env.PORT || 3000;
const server =app.listen(3000, () => console.log(`Listening on port ${port}...`));

if (process.env.NODE_ENV=='test')
{
    server.close();
}

module.exports = server;