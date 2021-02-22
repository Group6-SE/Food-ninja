const {validateFoodItem} = require('../../validation/food_item_creation');
const Manager = require('../../models/manager');
const _ = require('lodash');

async function addFoodItem(request,response){
    const {error} = validateFoodItem(request.body);
    if(error){
        return response.render('400.html',{mssg: error.message});
    }

    try {
        await Manager.addFoodItem(_.pick(request.body,["food_item_id","food_item_name","price","description","calorie_amount","image"]));
        response.render('manager/home.html');

        
    } catch (error) {
       return  response.render('500.html',{mssg:"ERROR"});
    }

    

}

exports.addFoodItem= addFoodItem;