const {pool} = require('../startup/mysql_database');

module.exports = class Driver{
    static notDelivered(request) {
        return new Promise((resolve, reject) => {
            pool.query("SELECT `order_id`,`customer`,`price`,customer.Address from processed_order LEFT JOIN customer on customer.email = processed_order.customer where processed_order.delivered='no';",
                (error, results, fields) => {
                    if (error) {
                        reject(error);
                    };
                    resolve(results);
                }
            )
        })
      
    
    }
    static updateDelivery(request) {
        return new Promise((resolve, reject) => {
            pool.query("UPDATE processed_order SET processed_order.delivered = 'yes', processed_order.delivery_person = ?  WHERE processed_order.order_id = ? ;",
                [   
                    request.userEmail,
                    request.body.order_id
                    
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

    static getOrderByDriver(request) {
        return new Promise((resolve, reject) => {
            pool.query(" SELECT  * from processed_order WHERE processed_order.delivery_person =? ;",
                [
                    request.userEmail
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



    
}