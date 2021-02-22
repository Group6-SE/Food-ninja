let server ;
const {pool} = require('../../../startup/mysql_database');
const {getFav,removeFavItem}=require('../../../controller/customer/favourites');

describe('GET/ favourite Items ',()=>{
    beforeEach( async ()=>{
        server =require('../../../index');
        await pool.query("INSERT INTO `customer_favourites`(`customer_email`, `food_item_id`) VALUES ('k@gmail.com','fa1')");

    });

    afterEach(async ()=>{ 
        // await pool.query("ROLLBACK");
        // await pool.end();
        // await pool.query("truncate table `customer_favourites`" );
        await server.close();
        

    });

    it('should return the favs of the user', async ()=>{

        let req ={
            userEmail: 'k@gmail.com'
        }

        let res = {
            render: jest.fn()
        }

        const result =[
            { food_item_id: 'fa1', food_item_name: 'burger', price: 250 }

        ]


        await getFav(req,res);

        expect(res.render).toHaveBeenCalledWith('customer/favourites.html',
        {result: result, 
            req:req});


    });



});

describe('remove from favs',()=>{
    beforeEach( async ()=>{
        server =require('../../../index');
        // await pool.query("INSERT INTO `customer_favourites`(`customer_email`, `food_item_id`) VALUES ('k@gmail.com','fa1')");
 
    });

    afterEach(async ()=>{ 
        await pool.query("delete from `customer_favourites`");
        await server.close();
        

    });

    it('should remove the selected item from favs', async ()=>{

        let req ={
            userEmail: 'k@gmail.com',
            body:{
                item:'fa1'
            }
        }

        let res ={
            redirect: jest.fn()
        }

        await removeFavItem(req,res);

        expect(res.redirect).toHaveBeenCalledWith('back');


    });

    

});
