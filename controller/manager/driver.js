const {validateDriver} = require('../../validation/driver_creation');
const Manager = require('../../models/manager');
const _ = require('lodash');
const bcrypt = require('bcrypt');


async function createDriver(request,response) {
    const {error} = validateDriver(request.body);
    if(error){
        return response.render('400.html',{mssg: error.message});  
    }

    const salt = await bcrypt.genSalt(5);
    request.body.password = await bcrypt.hash(request.body.password, salt);

    try {
        await Manager.insertDriver(_.pick(request.body,["name","contact_number","vehicle_type","vehicle_number","email","password"]));
        response.render('manager/home.html');
        
    } catch (error) {
        return  response.render('500.html',{mssg: error.message}); 
    }

   
    
}

exports.createDriver = createDriver;





