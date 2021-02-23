const {logout}= require('../../controller/logout');

let req={
    session:'token'
}
let res ={
    redirect:jest.fn(),
    status: jest.fn(()=> res)
}

describe('session controller',()=>{

    it('no session exist',()=>{
        req.session=null;
        logout(req,res);
        expect(res.redirect).toHaveBeenCalledWith('/');


    });

    it('destroy exsiting session',()=>{
        
        logout(req,res);
        expect(req.session).toEqual(null);


    });


});

