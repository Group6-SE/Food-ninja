const {pool}= require('../../../startup/mysql_database');
const {createDiscount}= require('../../../controller/manager/discount');
let req;
let server ;


describe('Manager/ Create Discount validation',()=>{


    beforeEach(()=>{

        req ={
            body:{

                discount_description:"test",
                eligible_price:"1000",
                discount_percentage:"10",
                start_date:"2021-02-23 22:27:08",
                end_date:"2021-03-03 10:27:08"

            }    
       }
    });

    const res={
        render: jest.fn()
    }


    it('start date validation check',async ()=>{
        req.body.start_date = "2021-02-20 22:27:08"
        await createDiscount(req,res);
        expect(res.render).toHaveBeenCalledWith('400.html',{"mssg": "\"start_date\" must be greater than or equal to \"now\""});

    });

    it('end date validation check',async ()=>{
        req.body.end_date = "2021-02-20 22:27:08"
        await createDiscount(req,res);
        expect(res.render).toHaveBeenCalledWith('400.html',{"mssg": "\"end_date\" must be greater than or equal to \"now\""});

    });

});


describe('Manager/ Create Discount ',()=>{


    beforeEach(()=>{
         server =require('../../../index');

         req ={
            body:{
    
                discount_description:"test",
                eligible_price:"1000",
                discount_percentage:"10",
                start_date:"2021-02-23 22:27:08",
                end_date:"2021-03-03 10:27:08"
    
            }    
       }

    });

    afterEach( async ()=>{

        await pool.query("DELETE FROM `discount` WHERE `discount_description`='test';");
        await server.close();
        
    });

    

    const res={
        render: jest.fn()
    }


    it('should add discount',async ()=>{
        await createDiscount(req,res);
        expect(res.render).toHaveBeenCalledWith('manager/home.html');
    });

    

});