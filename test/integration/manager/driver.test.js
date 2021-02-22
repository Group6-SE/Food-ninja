const { createDriver} =require('../../../controller/manager/driver');
const {pool}= require('../../../startup/mysql_database');
let server;
let req;
const res={
    render: jest.fn()
};

describe('Manager/ create driver validation',()=>{

    beforeEach(()=>{
        server = require('../../../index');
        
        req ={
            body:{

                name:"drivername",
                contact_number:"1234569870",
                vehicle_type:"type",
                vehicle_number:"num",
                email:"d@gmail.com",
                password: "test123"

            }    
       }
    });
    afterEach( async()=>{

        await server.close();
    });

    it('driver email is not valid' , async()=>{
        req.body.email="";
        await createDriver(req,res);
        expect(res.render).toHaveBeenCalledWith('400.html',{mssg: "\"email\" is not allowed to be empty"});

    });
 

});

describe("Manager driver creation",()=>{

    beforeEach( async ()=>{
        server = require('../../../index');

        await pool.query("SET autocommit = OFF");
        await pool.query("BEGIN");
        req ={
            body:{

                name:"drivername",
                contact_number:"1234569870",
                vehicle_type:"type",
                vehicle_number:"num",
                email:"d@gmail.com",
                password: "test123"

            }    
       }

    });
    afterEach( async()=>{
        // await pool.query("DELETE FROM `delivery_person`;");
        await pool.query("ROLLBACK");
        await server.close();
    });

    it('should create driver' , async()=>{
        
        await createDriver(req,res);
        // await pool.query("DELETE FROM `delivery_person`;");
        expect(res.render).toHaveBeenCalledWith('manager/home.html');

    });



});