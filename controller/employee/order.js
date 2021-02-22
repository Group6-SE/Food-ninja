const Employee =require('../../models/employee');

async function getAllOrder(request,response){
    try {
         const result =  await Employee.getAllOrder();
         const order = JSON.parse(JSON.stringify(result[0]));
         response.render('employee/orderlist.html',{order: order, email:request.userEmail});
        
        
    } catch (error) {
        response.send(error.message);
        
    }
    
    
}


async function completeOrder(request,response){
    try {
         await Employee.completeOrder(request);        
        
    } catch (error) {
        response.send(error.message);
        
    }
    response.redirect('back');
    
    
}

async function getAcceptedOrders(request,response){
    try {
         const result =  await Employee.getAcceptedOrders();
         const order = JSON.parse(JSON.stringify(result[0]));
         response.render('employee/accepted_order.html',{accepted: order, email:request.userEmail});
        
        
    } catch (error) {
        response.send(error.message);
        
    }
    
    
}

exports.getAllOrder = getAllOrder;
exports.completeOrder=completeOrder;
exports.getAcceptedOrders=getAcceptedOrders;