const Customer = require('../../models/customer');

async function getCart(request,response){
    try {
        const res = await Customer.getCart(request);
        const res2 = await Customer.getTotalPrice(request);
        const result = JSON.parse(JSON.stringify(res[0]));
        const total = JSON.parse(JSON.stringify(res2[0]));
        response.render('customer/cart.html',{result: result, email:request.userEmail ,total:total});
        
    } catch (error) {
        response.send(error.message);
        
    }
    
    
}

async function removeCartItem(request,response){
    try {
         await Customer.removeCartItem(request);
        
       
        
    } catch (error) {
        response.send(error.message);
        
    }
    response.redirect('back');
    
    
}


async function createOrder(request,response){
    let rezz
    try {
         rezz=await Customer.createOrder(request);
         const result =  await Customer.getCurrentOrder(request);
         const order = JSON.parse(JSON.stringify(result[0]));
        let total =0;
         order.forEach(item => {
             total+= item.price
         });
         response.render('customer/order.html',{order: order, email:request.userEmail , total:total});
        
        
    } catch (error) {
        response.render('500.html',{msssg:error.message});
        
    }
    
    
}

async function getOngoinOrder(request,response){
    try {
         const result =  await Customer.getCurrentOrder(request);
         const order = JSON.parse(JSON.stringify(result[0]));
        let total =0;
         order.forEach(item => {
             total+= item.price
         });
         response.render('customer/order.html',{order: order, req:request , total:total});
        
        
    } catch (error) {
        // response.send(error.message);
        
    }
    
    
}



async function showDiscount(request,response){
    
    try {
            let discount;
            
         const result = await Customer.getDiscount(request);
        // discount = JSON.parse(JSON.stringify(result[0]));   
        if(result[0]){
            discount = JSON.parse(JSON.stringify(result[0]));
         }
         else{
             discount=[{}]

         }    

         
          
         response.render('customer/discounts.html',{discount: discount, req:request});
        
        
    } catch (error) {
         response.render('500.html',{err: error.message});
        
    }
    
    
}

function loadOrderFinal(request,response) {
    response.render('customer/final_order.html',{req:request});


    
}



exports.getCart = getCart;
exports.removeCartItem = removeCartItem;
exports.createOrder=createOrder;
exports.showDiscount = showDiscount;
exports.getOngoinOrder = getOngoinOrder;
exports.loadOrderFinal = loadOrderFinal;
