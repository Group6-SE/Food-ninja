
const islogged = require('../../../middleware/login');
const {generateAuthToken} = require('../../../controller/login');


let  request ={
    session:{

    }
    

};
let response= {
    render: jest.fn(),
    redirect: jest.fn()
};
let next= jest.fn();
const  payload = {
    userEmail: 'k@gmail.com',
    privilege_level: 1
    
};

describe('login middleware',()=>{


    it('if token doesnt exist should redirect to login',()=>{
        request.session.token =''
        islogged(request,response,next);
        expect(response.redirect).toHaveBeenCalledWith('/login')


    });

    it('if session exist with valid token',()=>{
        request.session.token = generateAuthToken(payload);
        islogged(request,response,next);
        expect(request.userEmail).toEqual('k@gmail.com');
        // expect(response.redirect).toHaveBeenCalledWith('/login') 

        
        



    });

    it('if session exist with invalid token',()=>{
        request.session.token='none'
        islogged(request,response,next); 
        expect(response.render).toHaveBeenCalledWith('400.html',{mssg:"Invalid token"})        
        



    });





});
