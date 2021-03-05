
let server;
const supertest =require('supertest');

let request ={
    userEmail:'k@gmail.com',
    privilege_level:'1',

}
// // let res={
// //     render:jest.fn()
// // }

// const payload ={
//     userEmail:'k@gmail.com',
//     privilege_level:'1'
// }
// let token;


describe('redirect to respective dashboard',()=>{

    beforeEach(()=>{
        server = require('../../../index');
       

    });

    afterEach(async ()=>{
        await server.close();
       

    });

    it('should redirect to main dashboard',async ()=>{

        // token = generateAuthToken(payload);
        // request.session.token=token;

        // let isLoggedIn = function (req, res, next) {
        //     next()
            
        // };

        const res = await supertest(server).get('/').send(request);

        expect(res.status).toBe(302);
        //expect(res.render).toHaveBeenCalledWith('manager/home.html');



    });

    // it('should redirect to employee dashboard',async ()=>{

    //     payload.privilege_level=2
    //     token = generateAuthToken(payload);
    //     request.session.token=token;
    //     const res =await supertest(server).get('/').set(request) ;
    //     expect(res.status).toBe(200);
    //     expect(res.render).toHaveBeenCalledWith('employee/home.html');



    // });

});