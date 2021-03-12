let server;
const route = require('../../../../routes/login')
const supertest =require('supertest');



describe('GET /login',()=>{

    beforeEach(()=>{
        server = require('../../../../index');

    });
    afterEach( ()=>{
         server.close();

    });

    it('if no user logged in should return Employee dashboard',async ()=>{
        
        const res =await supertest(server).get('/login');
        expect(res.status).toBe(200);
    

    })
})