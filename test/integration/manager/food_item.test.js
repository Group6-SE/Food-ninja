const {pool}= require('../../../startup/mysql_database');
const {addFoodItem}= require('../../../controller/manager/food_item');

const res={
    render: jest.fn()
};

let server ;

let req;

describe('Manager/ add food item validation',()=>{

    beforeEach(()=>{
        server = require('../../../index');
        req ={
            body:{

                food_item_id:"testID",
                food_item_name:"test",
                price:"1000",
                calorie_amount:"200",
                description:"yummy",
                'image': "p.png"

            }    
       }
    });
    afterEach( async()=>{

        await server.close();
    });

    it('food id not entered' , async()=>{
        req.body.food_item_id=null;
        await addFoodItem(req,res);
        expect(res.render).toHaveBeenCalledWith('400.html',{mssg: "\"food_item_id\" must be a string"});

    });
 

});


describe('Manager/ add food item ',()=>{

    beforeEach(()=>{
        server = require('../../../index');
        req ={
            body:{

                food_item_id:"testID",
                food_item_name:"test",
                price:"1000",
                calorie_amount:"200",
                description:"yummy",
                'image': "p.png"

            }    
       }
    });
    afterEach( async ()=>{
        await pool.query("DELETE FROM `food_item` WHERE `food_item_id`='testID';");
        await server.close();
    });

    it('food id not entered' , async()=>{
        await addFoodItem(req,res);
        expect(res.render).toHaveBeenCalledWith('manager/home.html');

    });
 

});

