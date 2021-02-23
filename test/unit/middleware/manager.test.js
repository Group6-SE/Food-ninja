const ismanager = require('../../../middleware/manager');

let req;
let res;
let next;
describe('check whether the user is a manager',()=>{

    beforeEach(()=>{

         req={
            privilege_level:1
        }
         res =
        {render: jest.fn()}
    
    
         next = jest.fn();

    })
    


    it('should deny access for customer',()=>{
        
        req.privilege_level=3;
        ismanager(req,res,next);
        expect(res.render).toHaveBeenCalledWith('401.html',{mssg:"Not Authorized"});


    });

    it('should deny access for employee',()=>{
        
        req.privilege_level=2;
        ismanager(req,res,next);
        expect(res.render).toHaveBeenCalledWith('401.html',{mssg:"Not Authorized"});


    });
    
    it('should deny access for driver',()=>{
        
        req.privilege_level=4;
        ismanager(req,res,next);
        expect(res.render).toHaveBeenCalledWith('401.html',{mssg:"Not Authorized"});


    });

    it('should deny access for Manager',()=>{
        
        ismanager(req,res,next);
        


    });


})