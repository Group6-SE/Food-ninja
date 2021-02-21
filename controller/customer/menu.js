const Customer = require('../../models/customer');

async function getMenu(request,response){
    try {
        const res = await Customer.getmenu();
        const result = JSON.parse(JSON.stringify(res[0]))
        if(!request.userEmail){
            response.render('400.html',{mssg: "user not found"});
        }else{

            return response.render('customer/menu.html',{result: result , mail: request.userEmail});

        }

       
        
    } catch (err) {
        response.render('500.html',{mssg: "menu error"});
        // throw new Error("internel error");
        
        
        
    }
    
    
}

async function addToCart(request,response) {
    // 1 means cart
    // 2 means favourite
    
    request.body={
        item: request.body.item,
        method_type: request.body.method_type
    }
    try {
        if(request.body.method_type ==1){
             await Customer.add_to_cart(request);
        }

        else if(request.body.method_type ==2){
            await Customer.add_to_fav(request);
        }
        
    } catch (error) {
        console.log(error);
    }
    return response.redirect('back');
}
exports.getMenu = getMenu;

exports.addToCart = addToCart;

