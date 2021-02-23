const {login}= require('../../controller/login');
const {pool}= require('../../startup/mysql_database');
let req;

let res ={
    render: jest.fn()
}
describe('should be able to login as a customer',()=>{

    beforeEach( async()=>{

        req={
            body:{
                email:'t@gmail.com',
                password:'admin1234',
                privilege_level:'3'
            },
            session:{
                
            }
        }

        server = require('../../index');
        await pool.query("SET autocommit = OFF");
        await pool.query("BEGIN");
        await pool.query("INSERT INTO `customer`( `customer_name`, `address`,  `contact_number`, `email`, `password`) VALUES ('testname','add','1234569870','t@gmail.com','$2a$05$ser6ZE59apqmW3zRe.Ok5O.L7Sf8WFNl7y3VuARLFnfona135wtNS');");
        

    });
    afterEach( async ()=>{
        await pool.query("ROLLBACK");
        await server.close();

    });

    it('logging sucessful',async ()=>{
        await login(req,res);
        expect(res.render).toHaveBeenCalledWith('customer/home.html');

    });

    
    it('user  not found',async ()=>{

        req.body.email='no@gmail.com';
        await login(req,res);
        expect(res.render).toHaveBeenCalledWith('400.html',{mssg: "User not registered"});


    });

    it('invalid passowrd or email',async ()=>{

        req.body.password='wrongpassword';
        await login(req,res);
        expect(res.render).toHaveBeenCalledWith('400.html',{mssg: "Invalid e-mail or password"});


    });

   

});

describe('should be able to login as a manager',()=>{

    beforeEach( async()=>{

        req={
            body:{
                email:'m@gmail.com',
                password:'admin1234',
                privilege_level:'1'
            },
            session:{
                
            }
        }

        server = require('../../index');
        await pool.query("SET autocommit = OFF");
        await pool.query("BEGIN");
        await pool.query("INSERT INTO `manager`( `manager_name`, `contact_number`, `email`, `password`) VALUES ('testname','1236547890','m@gmail.com','$2a$05$ser6ZE59apqmW3zRe.Ok5O.L7Sf8WFNl7y3VuARLFnfona135wtNS');");
        

    });
    afterEach( async ()=>{
        await pool.query("ROLLBACK");
        await server.close();

    });

    it('logging sucessful',async ()=>{
        await login(req,res);
        expect(res.render).toHaveBeenCalledWith('manager/home.html');

    });

    
    it('user  not found',async ()=>{

        req.body.email='no@gmail.com';
        await login(req,res);
        expect(res.render).toHaveBeenCalledWith('400.html',{mssg: "User not registered"});


    });

    it('invalid passowrd or email',async ()=>{

        req.body.password='wrongpassword';
        await login(req,res);
        expect(res.render).toHaveBeenCalledWith('400.html',{mssg: "Invalid e-mail or password"});


    });

   

});

describe('should be able to login as a employee',()=>{

    beforeEach( async()=>{

        req={
            body:{
                email:'e@gmail.com',
                password:'admin1234',
                privilege_level:'2'
            },
            session:{
                
            }
        }

        server = require('../../index');
        await pool.query("SET autocommit = OFF");
        await pool.query("BEGIN");
        await pool.query("INSERT INTO `employee`( `employee_name`, `job_post`, `email`, `password`, `contact_number`) VALUES ('testname','testjob','e@gmail.com','$2a$05$ser6ZE59apqmW3zRe.Ok5O.L7Sf8WFNl7y3VuARLFnfona135wtNS','1236547890');");
        

    });
    afterEach( async ()=>{
        await pool.query("ROLLBACK");
        await server.close();

    });

    it('logging sucessful',async ()=>{
        await login(req,res);
        expect(res.render).toHaveBeenCalledWith('employee/home.html');

    });

    
    it('user  not found',async ()=>{

        req.body.email='no@gmail.com';
        await login(req,res);
        expect(res.render).toHaveBeenCalledWith('400.html',{mssg: "User not registered"});


    });

    it('invalid passowrd or email',async ()=>{

        req.body.password='wrongpassword';
        await login(req,res);
        expect(res.render).toHaveBeenCalledWith('400.html',{mssg: "Invalid e-mail or password"});


    });

   

});

describe('should be able to login as a driver',()=>{

    beforeEach( async()=>{

        req={
            body:{
                email:'d@gmail.com',
                password:'admin1234',
                privilege_level:'4'
            },
            session:{
                
            }
        }

        server = require('../../index');
        await pool.query("SET autocommit = OFF");
        await pool.query("BEGIN");
        await pool.query("INSERT INTO `delivery_person`( `name`, `contact_number`, `vehicle_type`, `vehicle_number`, `email`, `password`) VALUES ('test','1236547965','aa','aa','d@gmail.com','$2a$05$ser6ZE59apqmW3zRe.Ok5O.L7Sf8WFNl7y3VuARLFnfona135wtNS');");
        

    });
    afterEach( async ()=>{
        await pool.query("ROLLBACK");
        await server.close();

    });

    it('logging sucessful',async ()=>{
        await login(req,res);
        expect(res.render).toHaveBeenCalledWith('driver/home.html');

    });

    
    it('user  not found',async ()=>{

        req.body.email='no@gmail.com';
        await login(req,res);
        expect(res.render).toHaveBeenCalledWith('400.html',{mssg: "User not registered"});


    });

    it('invalid passowrd or email',async ()=>{

        req.body.password='wrongpassword';
        await login(req,res);
        expect(res.render).toHaveBeenCalledWith('400.html',{mssg: "Invalid e-mail or password"});


    });

   

});





describe('validate login credentials',()=>{
    beforeEach(()=>{
         req={
            body:{
                email:'k@gmail.com',
                password:'test123',
                privilege_level:'1'
        
            }
        }

    });

    it('entered invalid email',async ()=>{
        
        req.body.email='';
        await login(req,res);
        expect(res.render).toHaveBeenCalledWith('400.html',{mssg: "\"email\" is not allowed to be empty"})
    });
    it('entered invalid password',async ()=>{
        req.body.password='1234';
        await login(req,res);
        expect(res.render).toHaveBeenCalledWith('400.html',{mssg: "\"password\" length must be at least 6 characters long"})
    });

    

});



