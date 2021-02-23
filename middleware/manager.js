module.exports = function (request, response, next) {
    
    if (request.privilege_level != 1) return response.render('401.html',{mssg:"Not Authorized"});

    next();
}