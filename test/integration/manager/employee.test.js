const { createEmployee} =require('../../../controller/manager/employee');
const {pool}= require('../../../startup/mysql_database');
let server;
let req;
const res={
    render: jest.fn()
};

describe('Manager/ create employee validation',()=>{

    beforeEach(()=>{
        server = require('../../../index');
        req ={
            body:{

                employee_name:"testemp",
                job_post:"test",
                contact_number:"1234569870",
                email:"e@gmail.com",
                password:"test123",

            }    
       }
    });
    afterEach( async()=>{

        await server.close();
    });

    it('employee email is not valid' , async()=>{
        req.body.email="";
        await createEmployee(req,res);
        expect(res.render).toHaveBeenCalledWith('400.html',{mssg: "\"email\" is not allowed to be empty"});

    });
 

});

describe("Manager employee creation",()=>{

    beforeEach(()=>{
        server = require('../../../index');
        req ={
            body:{

                employee_name:"testemp",
                job_post:"test",
                contact_number:"1234569870",
                email:"e@gmail.com",
                password:"test123",

            }    
       }
    });
    afterEach( async()=>{
        await pool.query("DELETE FROM `employee`;");
        await server.close();
    });

    it('should create employee' , async()=>{
        
        await createEmployee(req,res);
        expect(res.render).toHaveBeenCalledWith('manager/home.html');

    });



});