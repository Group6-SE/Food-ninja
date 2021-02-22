const { getDiscount } = require('../../models/customer');
const Driver =require('../../models/driver');


async function tobeDelivered(request,response){
    try {
         const result =  await Driver.notDelivered();
         const order = JSON.parse(JSON.stringify(result[0]));
         response.render('driver/orders.html',{penidng: order, email:request.userEmail});
        
        
    } catch (error) {
        response.render('500.html',{mssg:"ERROR "});
        
    }
    
    
}

async function updateDelivery(request,response){
    try {
          await Driver.updateDelivery(request);
    
        
        
    } catch (error) {
        response.send(error.message);
        
    }
    response.redirect('back');
    
    
}


async function getOrderByDriver(request,response){
    try {
         const result =  await Driver.getOrderByDriver(request);
         const order = JSON.parse(JSON.stringify(result[0]));
         response.render('driver/my_orders.html',{order: order, email:request.userEmail});
        
        
    } catch (error) {
        response.send(error.message);
        
    }
    
    
}
exports.tobeDelivered = tobeDelivered;
exports.updateDelivery = updateDelivery;
exports.getOrderByDriver = getOrderByDriver;