let server;
const supertest =require('supertest');



describe('GEt /login',()=>{

    beforeEach(()=>{
        server = require('../../../index');

    });
    afterEach( ()=>{
         server.close();

    });

    it('if no user logged in should return main dashbord',async ()=>{

        const res =await supertest(server).get('/login');
        expect(res.status).toBe(200);
        // expect(res.sendFile).toBe(200);

    })
})