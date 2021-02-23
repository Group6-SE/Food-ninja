const isemployee = require('../../../middleware/employee');

let req;
let res;
let next;
describe('check whether the user is a employee',()=>{

    beforeEach(()=>{

         req={
            privilege_level:2
        }
         res =
        {render: jest.fn()}
    
    
         next = jest.fn();

    })
    


    it('should deny access for manager',()=>{
        
        req.privilege_level=1;
        isemployee(req,res,next);
        expect(res.render).toHaveBeenCalledWith('401.html',{mssg:"Not Authorized"});


    });

    it('should deny access for customer',()=>{
        
        req.privilege_level=3;
        isemployee(req,res,next);
        expect(res.render).toHaveBeenCalledWith('401.html',{mssg:"Not Authorized"});


    });
    
    it('should deny access for driver',()=>{
        
        req.privilege_level=4;
        isemployee(req,res,next);
        expect(res.render).toHaveBeenCalledWith('401.html',{mssg:"Not Authorized"});


    });

    it('should deny access for employee',()=>{
        
        isemployee(req,res,next);
        


    });


})