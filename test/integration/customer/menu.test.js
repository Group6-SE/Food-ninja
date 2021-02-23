let server ;
const {pool} = require('../../../startup/mysql_database');
const {getMenu,addToCart}=require('../../../controller/customer/menu');



    

describe('get menu item', ()=>{

        
    beforeEach( async ()=>{
        server =require('../../../index');
        // await pool.query("INSERT INTO `customer`(`customer_name`, `address`, `loyalty_points`, `contact_number`, `email`, `password`) VALUES ('kamal','ddd','250','7896541230','k@gmail.com','p/w');")
        // await pool.query("INSERT INTO `food_item`(`food_item_id`, `food_item_name`, `price`, `description`, `calorie_amount`, `image`) VALUES ('fa1','burger',250,'yummy',100,'img.png');");
        
    });

    afterEach(async ()=>{ 
            
     await server.close();
        

    });

        let req ={
            userEmail: 'k@gmail.com'
        };
    
        let res ={
            render: jest.fn()
        };

        it('return all menu items', async()=>{

            const result = [
                {
                      food_item_id: 'fa1',
                      food_item_name: 'burger',
                      price: 250,
                      description: 'yummy',
                      calorie_amount: 100,
                    },
            ];
    
            await getMenu(req,res);
    
            expect(res.render).toHaveBeenCalledWith('customer/menu.html',
            {result: result , 
            mail: req.userEmail});
        });
    
        it('return 400 page due to user not logged', async()=>{
            let req ={
                userEmail: null
            };
    
            await getMenu(req,res)
             
            expect(res.render).toHaveBeenCalledWith('400.html',
            {mssg: "user not found"});
    
            
    
    
    
        });
    
        // it('return 500 oage due to internal server error', async()=>{
        //     await server.close();
    
            
        //     expect(async ()=>{await getMenu(req,res);}).toThrow();
             
        //     // expect(res.render).toHaveBeenCalledWith('500.html',
        //     // {mssg: "menu error"});
    
            
    
    
    
        // });

    });

describe(' adding a food item to the cart or fav',()=>{

        beforeEach( async ()=>{
            server =require('../../../index');  
        });
    
        afterEach(async ()=>{    
             await pool.query("truncate table `customer_favourites`;");          
             await pool.query("delete from  `customer_cart`;");
             await server.close();
            
    
        });

        
        it('added the item to cart', async()=>{

            let req={
                body: {
                    item: 'fa1', 
                    method_type: '1',
                },
                userEmail :"k@gmail.com"
            }
            let res ={
                redirect: jest.fn()
            }
    
            await addToCart(req, res);
            expect(res.redirect).toHaveBeenCalledWith('back');
    
        });
    
    
        it('added the item to fav', async()=>{
    
            let req={
                body: {
                    item: 'fa1', 
                    method_type: '2',
                },
                userEmail :"k@gmail.com"
            }
            let res ={
                redirect: jest.fn()
            }
    
            await addToCart(req, res);
    
            expect(res.redirect).toHaveBeenCalledWith('back');
    
        });

    });

    


