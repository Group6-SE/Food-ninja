const {pool} = require('../startup/mysql_database');

module.exports = class Employee{

    static getAllOrder(request) {
        return new Promise((resolve, reject) => {
            pool.query("SELECT  order_id, order_cart.food_item_id, food_item.food_item_name, food_item.price FROM  order_cart left join food_item on order_cart.food_item_id = food_item.food_item_id  where order_cart.completed ='no';",
                (error, results, fields) => {
                    if (error) {
                        reject(error);
                    };
                    resolve(results);
                }
            )
        })
      
    
    }

    static completeOrder(request) {
        return new Promise((resolve, reject) => {
            pool.query("INSERT into processed_order(processed_order.order_id,processed_order.customer,processed_order.price,processed_order.order_date) SELECT order_cart.order_id,order_cart.customer_email,sum(food_item.price) , now() from (order_cart left JOIN food_item  on food_item.food_item_id = order_cart.food_item_id ) GROUP by order_cart.order_id HAVING order_cart.order_id = (?) ; UPDATE order_cart SET order_cart.completed = 'yes' WHERE order_cart.order_id = (?) ;",
                [
                    request.body.order_id,
                    request.body.order_id,
                ],
                (error, results, fields) => {
                    if (error) {
                        reject(error);
                    };
                    resolve(results);
                }
            )
        })
      
    
    }
    
    static getAcceptedOrders() {
        return new Promise((resolve, reject) => {
            pool.query("SELECT  * from processed_order;",
                (error, results, fields) => {
                    if (error) {
                        reject(error);
                    };
                    resolve(results);
                }
            )
        })
      
    
    }
}

