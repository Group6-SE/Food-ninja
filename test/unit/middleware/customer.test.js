const iscustomer = require('../../../middleware/customer');

let req;
let res;
let next;
describe('check whether the user is a Customer',()=>{

    beforeEach(()=>{

         req={
            privilege_level:2
        }
         res =
        {render: jest.fn()}
    
    
         next = jest.fn();

    })
    


    it('should deny access for Manager',()=>{
        
        req.privilege_level=1;
        iscustomer(req,res,next);
        expect(res.render).toHaveBeenCalledWith('401.html',{mssg:"Not Authorized"});


    });

    it('should deny access for employee',()=>{
        
        req.privilege_level=2;
        iscustomer(req,res,next);
        expect(res.render).toHaveBeenCalledWith('401.html',{mssg:"Not Authorized"});


    });
    
    it('should deny access for driver',()=>{
        
        req.privilege_level=4;
        iscustomer(req,res,next);
        expect(res.render).toHaveBeenCalledWith('401.html',{mssg:"Not Authorized"});


    });

    it('should deny access for Manager',()=>{
        
        req.privilege_level=3;
        iscustomer(req,res,next);
        


    });


})