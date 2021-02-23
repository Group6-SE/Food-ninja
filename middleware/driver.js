module.exports = function (request, response, next) {
   
    //basically we define that the operation after this middleware function can only be done if the user is a branch manager
    if (request.privilege_level != 4) return response.render('401.html',{mssg:"Not Authorized"});

    next();
}