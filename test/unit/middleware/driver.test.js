const isdriver = require('../../../middleware/driver');

let req;
let res;
let next;
describe('check whether the user is a driver',()=>{

    beforeEach(()=>{

         req={
            privilege_level:4
        }
         res =
        {render: jest.fn()}
    
    
         next = jest.fn();

    })
    


    it('should deny access for manager',()=>{
        
        req.privilege_level=1;
        isdriver(req,res,next);
        expect(res.render).toHaveBeenCalledWith('401.html',{mssg:"Not Authorized"});


    });

    it('should deny access for employee',()=>{
        
        req.privilege_level=2;
        isdriver(req,res,next);
        expect(res.render).toHaveBeenCalledWith('401.html',{mssg:"Not Authorized"});


    });
    
    it('should deny access for customer',()=>{
        
        req.privilege_level=3;
        isdriver(req,res,next);
        expect(res.render).toHaveBeenCalledWith('401.html',{mssg:"Not Authorized"});


    });

    it('should deny access for driver',()=>{
        
        isdriver(req,res,next);
        


    });


})