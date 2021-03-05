let server ;
const {pool} = require('../../../startup/mysql_database');
const {getMenu,addToCart}=require('../../../controller/customer/menu');



    

describe('get menu item', ()=>{

        
    beforeEach( async ()=>{
        server =require('../../../index');
        
        
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
            req ={
                userEmail: null
            };
    
            await getMenu(req,res)
             
            expect(res.render).toHaveBeenCalledWith('400.html',
            {mssg: "user not found"});
    
            
    
    
    
        });
    
      
    });

describe(' adding a food item to the cart or fav',()=>{

        beforeEach( async ()=>{
            server =require('../../../index');  
            await pool.query("SET autocommit = OFF");
            await pool.query("BEGIN");
        });
    
        afterEach(async ()=>{    
             await pool.query("ROLLBACK");
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

    



