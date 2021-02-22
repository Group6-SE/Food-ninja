const {createCustomer} =require('../../../controller/customer/register');
const {pool}= require('../../../startup/mysql_database');
let server;
let req;

describe('Customer validation',()=>{
    
    const res={
        render: jest.fn()
    }
    
    beforeEach(()=>{
        server =require('../../../index');
         req ={
             body:{

                customer_name:"saman",
                address:"address",
                contact_number:"1234569870",
                email:"s@gmail.com",
                password:"test123"

             }    
        }

    });
    
    afterEach(async ()=>{
        await server.close();

    });


     it('validation failed not an email',async ()=>{
        
        req.body.email=""
        await createCustomer(req,res);
        expect(res.render).toHaveBeenCalledWith('400.html',{"mssg": "\"email\" is not allowed to be empty"});
        req.body.password="s@gmail.com"

    });


    it('validation failed password len greater than 6',async ()=>{
        
        req.body.password="1234"
        await createCustomer(req,res);
        expect(res.render).toHaveBeenCalledWith('400.html',{"mssg": "\"password\" length must be at least 6 characters long"});
        req.body.password="test123"

    });

    it('validation failed name is required',async ()=>{
        
        req.body.customer_name=null;
        await createCustomer(req,res);
        expect(res.render).toHaveBeenCalledWith('400.html',{"mssg": "\"customer_name\" must be a string",});
        req.body.customer_name="saman";
    });



});

// describe('check bcyrpt password conversion',()=>{

    
//     const req ={
//         body:{
//             password:"admin1234"
//         }
//     }
//     it('should return hashed password',async ()=>{


        



//     });

// });

describe('Customer creation', ()=>{
    beforeEach(async ()=>{

        server =require('../../../index');
        await pool.query("SET autocommit = OFF");
        await pool.query("BEGIN");

        req ={
            body:{
    
               customer_name:"saman",
               address:"address",
               contact_number:"1234569870",
               email:"s@gmail.com",
               password:"test123"
    
            }
       }
    })

    afterEach(async ()=>{
        await pool.query("ROLLBACK");
        await server.close();


    });
    


    const res={
        render: jest.fn()
    }

    it('should enter customer', async ()=>{ 
        
            await createCustomer(req,res);
            expect(res.render).toHaveBeenCalledWith('customer/home.html');


    })

    
   



})


