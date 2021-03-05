let server ;
const {pool} = require('../../../startup/mysql_database');
const {getCart,removeCartItem,createOrder,getOngoinOrder,loadOrderFinal,showDiscount}=require('../../../controller/customer/cart');



describe('GET/ cart ',()=>{
    beforeEach( async ()=>{
        server =require('../../../index');
        await pool.query("SET autocommit = OFF");
        await pool.query("BEGIN");
        await pool.query("INSERT INTO `customer_cart`(`customer_email`, `food_item_id`) VALUES ('k@gmail.com','fa1')");

    });

    afterEach(async ()=>{ 
        await pool.query("ROLLBACK");
        // await pool.end();
        // await pool.query("DELETE FROM `customer_cart` WHERE `customer_email`=`k@gmail.com` AND `food_item_id`=`fa1;" );
        await server.close();
        

    });

    it('should return the cart of the user', async ()=>{

        let req ={
            userEmail: 'k@gmail.com'
        }

        let res = {
            render: jest.fn()
        }

        const result ={ food_item_id: 'fa1', food_item_name: 'burger', price: 250 }

        
        const total =[
            {total_price: 250}
        ]

        await getCart(req,res);

        expect(res.render).toHaveBeenCalledWith('customer/cart.html',
        {   result: result, 
            email:req.userEmail ,
            total:total
        });


    });



});

describe('cart removal ',()=>{
    beforeEach( async ()=>{
        server =require('../../../index');
        await pool.query("INSERT INTO `customer_cart`(`customer_email`, `food_item_id`) VALUES ('k@gmail.com','fa1')");

    });

    afterEach(async ()=>{ 
        await server.close();
        

    });

    it('should remove the selected item', async ()=>{

        let req ={
            userEmail: 'k@gmail.com',
            body:{
                item:'fa1'
            }
        }

        let res ={
            redirect: jest.fn()
        }

    

        await removeCartItem(req,res);

        expect(res.redirect).toHaveBeenCalledWith('back');


    });



});

describe('convert the cart to order ',()=>{
    beforeEach( async ()=>{
        server =require('../../../index');
        await pool.query("SET autocommit = OFF");
        await pool.query("BEGIN");
        await pool.query("INSERT INTO `customer_cart`(`customer_email`, `food_item_id`) VALUES ('k@gmail.com','fa1')");

    });

    afterEach(async  ()=>{ 
        // await pool.query("DELETE FROM `customer_cart` WHERE `customer_email`=`k@gmail.com` AND `food_item_id`=`fa1;");
        
        await pool.query("ROLLBACK");
        await server.close();
        

    });

    it('should created succesfully', async ()=>{

        let req ={
            userEmail: 'k@gmail.com',
          
        }

        let res ={
            render: jest.fn()
        }

        const order =[
            {
                order_id: 1,
                food_item_id: 'fa1',
                food_item_name: 'burger',
                price: 250
              }
        ];
        const total = 250;


    

        await createOrder(req,res);

        expect(res.render).toHaveBeenCalledWith('customer/order.html',
        {   order: order,
             email:req.userEmail , 
             total:total});


    });

});

describe('get ongoing order' ,()=>{
        beforeEach( async ()=>{
            server =require('../../../index');
            await pool.query("SET autocommit = OFF");
            await pool.query("BEGIN");
            await pool.query("INSERT INTO `order_cart`(`order_id`, `customer_email`, `food_item_id`) VALUES (1,'k@gmail.com','fa1');")

            
      
    
        });
    
        afterEach(async ()=>{ 
            await pool.query("ROLLBACK");
            await server.close();
            
    
        });
    
        it('should return ongoing order', async ()=>{
    
            let req ={
                userEmail: 'k@gmail.com',
              
            }
    
            let res ={
                render: jest.fn()
            }
    
            const order =[
                {   order_id: 1,
                    food_item_id: 'fa1',
                    food_item_name: 'burger',
                    price: 250 },
    
            ];
            const total = 250;
    
    
        
    
            await getOngoinOrder(req,res);
    
            expect(res.render).toHaveBeenCalledWith('customer/order.html',
            {order: order, 
                req:req ,
                 total:total});
    
    
        });
    
});


describe('get discounts' ,()=>{
    beforeEach( async ()=>{
        server =require('../../../index');
        await pool.query("SET autocommit = OFF");
        await pool.query("BEGIN");
        await pool.query("INSERT INTO `discount`( `discount_id`,`discount_description`, `eligible_price`, `discount_percentage`, `start_date`, `end_date`) VALUES (1,'dis','1000','10','2021-02-21 12:07:00','2021-03-15');");       

    });

    afterEach(async ()=>{ 
        await pool.query("ROLLBACK");
        await server.close();
        

    });

    it('should return eligilble discounts', async ()=>{

        let req ={
            body: {
                total :250
            },
          
        }
        //awul
        const discount=
                {
                discount_id: 1,
                discount_description: 'dis',
                discount_percentage: 10
              }
            


        let res ={
            render: jest.fn()
        }



        await showDiscount(req,res);

        expect(res.render).toHaveBeenCalledWith('customer/discounts.html',
        {discount: discount, 
            req:req}
            );


    });

});

describe('get final order' ,()=>{
    beforeEach( async ()=>{
        server =require('../../../index');

    });

    afterEach(async ()=>{ 
        await server.close();
        

    });

    it('should return final order', async ()=>{

        const req ={
            body: {
                order_id:1,
                total_price :250
            },
          
        }


        const  res ={
            render: jest.fn()
        }



        await loadOrderFinal(req,res);

        expect(res.render).toHaveBeenCalledWith('customer/final_order.html',{req:req} );


    });

});

