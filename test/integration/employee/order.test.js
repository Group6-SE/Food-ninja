const {pool}= require('../../../startup/mysql_database');
const {getAcceptedOrders,getAllOrder,completeOrder}=require('../../../controller/employee/order');

describe('pending orders not accepted',()=>{

    beforeEach( async ()=>{
        server =require('../../../index');
        await pool.query("INSERT INTO `order_cart`(`order_id`, `customer_email`, `food_item_id`, `completed`) VALUES ('1','k@gmail.com','fa1','no');");

    });

    afterEach(async ()=>{ 
        await pool.query("DELETE FROM `order_cart`");
        await server.close();
        

    });


    it('All pending orders should be displayed to employee',async ()=>{

        
        let req ={
            userEmail: 'e@gmail.com',
          
        }

        let res ={
            render: jest.fn()
        }

        const order =[
            {
                food_item_id: "fa1",
                food_item_name: "burger",
                order_id: 1,
                price: 250,
            }
            
        
        ];

        await getAllOrder(req,res);
        
        expect(res.render).toHaveBeenCalledWith('employee/orderlist.html',{order: order, email:req.userEmail});
        


    });


    it('driver accepting order',async ()=>{

        
        let req ={
            userEmail: 'e@gmail.com',
            body:{
                order_id:1
            }
          
        }

        let res ={
            redirect: jest.fn()
        }


        await completeOrder(req,res);
        

        expect(res.redirect).toHaveBeenCalledWith('back');
       


    });

    



});

describe('employee view for accepted orders',()=>{

    beforeEach( async ()=>{
        server =require('../../../index');

    });

    afterEach(async ()=>{ 
        await pool.query("DELETE FROM `processed_order` ");
        await server.close();
        

    });


    it('should display all the accepted orders',async ()=>{

        let req ={
            userEmail: 'd@gmail.com',
          
        }
    
        let res ={
            render: jest.fn()
        }
    
        
        const order =[
            {

            customer: "k@gmail.com",
            delivered: "no",
            delivery_person: null,
            order_date: "2021-02-21T18:30:00.000Z",
            order_id: 1,
            price: 250,
            }

         
        
        ];
    
        await getAcceptedOrders(req,res);
        expect(res.render).toHaveBeenLastCalledWith('employee/accepted_order.html',
        {accepted: order, 
            email:req.userEmail});
    
    
    
    
    });




});



