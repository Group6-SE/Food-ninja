const {validateEmployee} = require('../../validation/employee_creation');
const Manager = require('../../models/manager');
const _ = require('lodash');
const bcrypt = require('bcrypt');


async function createEmployee(request,response) {
    const {error} = validateEmployee(request.body);
    if(error){
        return response.render('400.html',{mssg: error.message});  
    }

    const salt = await bcrypt.genSalt(5);
    request.body.password = await bcrypt.hash(request.body.password, salt);

    try {
        await Manager.insertEmployee(_.pick(request.body,["employee_name","job_post","email","password","contact_number"]));
        response.render('manager/home.html');
        
    } catch (error) {
       return  response.render('500.html',{mssg: "ERROR"});  
    }

    
    
}

exports.createEmployee = createEmployee;





