const Customer = require('../../models/customer');

async function getFav(request,response){
    try {
        console.log(request.userEmail);
        const res = await Customer.getFav(request);
        const result = JSON.parse(JSON.stringify(res[0]));
        response.render('customer/favourites.html',{result: result, req:request});
        
    } catch (error) {
        // response.send(error.message);
        
    }
    
    
}

async function removeFavItem(request,response){
    try {
         await Customer.removeFavItem(request);
        
       
        
    } catch (error) {
        // response.send(error.message);
        
    }
    response.redirect('back');
    
    
}


exports.getFav = getFav;
exports.removeFavItem= removeFavItem;

