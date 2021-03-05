const {validateFoodItem} =require('../../../validation/food_item_creation');
let item;
describe('item validation process',()=>{

    beforeEach(()=>{

        item ={
            food_item_id:"testID",
            food_item_name:"test",
            price:"1000",
            calorie_amount:"200",
            description:"yummy",
            'image': "p.png"
       }

    });
    it('food item id cannot be empty',()=>{
        item.food_item_id=""
        const result = validateFoodItem(item)
        expect(result.error.message).toEqual( "\"food_item_id\" is not allowed to be empty");

    });

    it('food item name cannot be empty',()=>{
        item.food_item_name=""
        const result = validateFoodItem(item)
        expect(result.error.message).toEqual( "\"food_item_name\" is not allowed to be empty");

    });

    it('food item price must be a number',()=>{
        item.price="aa"
        const result = validateFoodItem(item)
        expect(result.error.message).toEqual( "\"price\" must be a number");

    });

    it('food item price must be postive',()=>{
        item.price="-100"
        const result = validateFoodItem(item)
        expect(result.error.message).toEqual( "\"price\" must be a positive number");

    });

    it('food item calory amount must be postive',()=>{
        item.calorie_amount="-100"
        const result = validateFoodItem(item)
        expect(result.error.message).toEqual( "\"calorie_amount\" must be a positive number");

    });

    it('food item description cannot be empty',()=>{
        item.description=""
        const result = validateFoodItem(item)
        expect(result.error.message).toEqual( "\"description\" is not allowed to be empty");

    });

    






});