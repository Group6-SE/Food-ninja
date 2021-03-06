const jwt = require('jsonwebtoken');    //json web token
const config = require('config');

module.exports = function (request, response, next) {
    const token = request.session.token;

    //if no token, client doesnt have needed permissions
    if (!token) {
        return response.status(401).redirect('/login');
    }
    try {
        const decoded = jwt.verify(token, config.get("jwtPrivateKey")); //this gives the payload
        request.privilege_level = decoded.privilege_level;
        request.userEmail = decoded.userEmail;
        next(); //calls the route handler
    } catch (error) {

        response.status(400).send("Invalid token");
        return;
    }
}
