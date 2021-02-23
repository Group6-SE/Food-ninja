const Joi = require('Joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getPassword } = require('../models/login');
const config = require('config');
const path = require('path');


function validateLogIn(login) {
    const schema = Joi.object({
        "email": Joi.string().required().email(),
        "password": Joi.string().min(5).max(1024).required(),
        "privilege_level":Joi.string().required()
    });
    return schema.validate(login);
}

function generateAuthToken(payload) {
    const token = jwt.sign(payload, config.get('jwtPrivateKey'), {
        expiresIn: 3600
    });
    // console.log(token);
    return token;
}

const login = async (request, response) => {
    const {error} = validateLogIn(request.body);
    if (error) {
        return response.status(400).send(error.message);
    }
    const email = request.body.email;
    var password;
    var procedure;
    var redirect;
    if (request.body.privilege_level == 1)
    {
        procedure = "manager";
        redirect = '../views/manager/home.html';
    }
    if (request.body.privilege_level == 2)
    {
        procedure = "employee";
        redirect = '../views/employee/home.html';

    }
    if (request.body.privilege_level == 3)
    {
        procedure = "customer";
        redirect = '../views/customer/home.html';

    }
    if (request.body.privilege_level == 4)
    {
        procedure = "delivery_person";
        redirect = '../views/driver/home.html';
    }

    try {
        password = await getPassword(email, procedure);
        // console.log(password);
         if (!password) {
             return response.status(400).send("User not registered");
        }
        // console.log(`request.body.password, ${request.body.password}`);
        // console.log(`true pass ${password}`);
        const validPassword = await  bcrypt.compare(request.body.password, password);

        // console.log(validPassword);
        if (!validPassword) {
            return response.status(400).send("Invalid e-mail or password"); //Not 404 because you dont want to give that much info to the client
        }
        
        const payload = {
            userEmail: email,
            privilege_level: request.body.privilege_level
        };

        const token = generateAuthToken(payload);
        // console.log(token);
        request.session.token = token;

        return response.status(200).sendFile(path.join(__dirname, redirect));
        
    } catch (error) {
        console.log(error.message);
        return response.status(500).send(error.message);
    }
}
exports.validateLogIn = validateLogIn;
exports.generateAuthToken = generateAuthToken;
exports.login = login;