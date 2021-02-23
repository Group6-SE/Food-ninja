const {pool}= require('../../../startup/mysql_database');
const {tobeDelivered,updateDelivery,getOrderByDriver}=require('../../../controller/driver/order');

describe('pending orders without driver assigned',()=>{

    beforeEach( async ()=>{
        server =require('../../../index');
        await pool.query("SET autocommit = OFF");
        await pool.query("BEGIN");
        await pool.query("INSERT INTO `processed_order`(`order_id`, `customer`, `price`, `order_date`, `delivered`, `delivery_person`) VALUES  ('1','k@gmail.com',250,'2020-02-22','no',null)");

    });

    afterEach(async ()=>{ 
        await pool.query("ROLLBACK");
        await server.close();
        

    });


    it('pending order should be displayed to driver',async ()=>{

        
        let req ={
            userEmail: 'k@gmail.com',
          
        }

        let res ={
            render: jest.fn()
        }

        const order =
            {
            Address: "ddd",
            customer: "k@gmail.com",
            order_id: 1,
            price: 250,
            };

        await tobeDelivered(req,res);
        expect(res.render).toHaveBeenCalledWith('driver/orders.html',{penidng: order,email:req.userEmail});



    });


    it('driver accepting order',async ()=>{

        
        let req ={
            userEmail: 'k@gmail.com',
            body:{
                order_id:1
            }
          
        }

        let res ={
            redirect: jest.fn()
        }


        await updateDelivery(req,res);
        expect(res.redirect).toHaveBeenCalledWith('back');



    });

    



});

describe('driver views his orders',()=>{

    beforeEach( async ()=>{
        server =require('../../../index');
        await pool.query("SET autocommit = OFF");
        await pool.query("BEGIN");
        await pool.query("INSERT INTO `processed_order`(`order_id`, `customer`, `price`, `order_date`, `delivered`, `delivery_person`) VALUES  ('1','k@gmail.com',250,'2020-02-22','yes','d@gmail.com')");

    });

    afterEach(async ()=>{ 
        await pool.query("ROLLBACK");
        await server.close();
        

    });


    it('should display current user drivers orders',async ()=>{

        let req ={
            userEmail: 'd@gmail.com',
          
        }
    
        let res ={
            render: jest.fn()
        }
    
        
        const order =
            {
            customer: "k@gmail.com",
            delivered: "yes",
            delivery_person: "d@gmail.com",
            order_date: "2020-02-21T18:30:00.000Z",
            order_id: 1,
            price: 250,
            }
        
    
        await getOrderByDriver(req,res);
        expect(res.render).toHaveBeenLastCalledWith('driver/my_orders.html',
        {order: order, email:req.userEmail});
    
    
    
    
    });




});


