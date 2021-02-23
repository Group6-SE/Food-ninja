const { request } = require('express');
const { result } = require('lodash');
const {pool} = require('../startup/mysql_database');

module.exports= class Customer {

    static getmenu() {
        return new Promise((resolve, reject) => {
            pool.query("CALL getMenu()",
                (error, results, fields) => {
                    if (error) {
                        reject(error);
                    };
                    resolve(results);
                }
            )
        })
      
    }



    static createCustomer(body) {
        return new Promise((resolve, reject) => {
            pool.query("INSERT INTO `customer`( `customer_name`, `address`, `contact_number`, `email`, `password`) VALUES (?,?,?,?,?)",
                [
                    body.customer_name,
                    body.address,
                    body.contact_number,
                    body.email,
                    body.password
                ],
                (error, results, fields) => {
                    if (error) {
                        reject(error.message);
                    };
                    resolve("customer created");
                }
            )
        })
      
    }

    static add_to_cart(request){
        return new Promise((resolve,reject) =>{
            pool.query("INSERT INTO `customer_cart` (`customer_email`,`food_item_id`) VALUES (?,?);",
            [
                request.userEmail,
                request.body.item
            ],
            (error, results, fields) => {
                if (error) {
                    reject(error);
                };
                resolve("added to cart");
            }
        )

        })
        
    }

    static getCart(request) {
        return new Promise((resolve, reject) => {
            pool.query("SELECT customer_cart.food_item_id, food_item.food_item_name, food_item.price FROM customer_cart LEFT  JOIN food_item on food_item.food_item_id= customer_cart.food_item_id WHERE customer_cart.customer_email = ?; ",
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

    static removeCartItem(request) {
        return new Promise((resolve, reject) => {
            pool.query("CALL removeCartItem(?,?)",
                [
                    request.userEmail,
                    request.body.item
                ],
                (error, results, fields) => {
                    if (error) {
                        reject(error);
                    };
                    resolve("removed noice");
                }
            )
        })
      
    }

    
    static add_to_fav(request){
        return new Promise((resolve,reject) =>{
            pool.query("INSERT INTO `customer_favourites` (`customer_email`,`food_item_id`) VALUES (?,?)",
            [
                request.userEmail,
                request.body.item
            ],
            (error, results, fields) => {
                if (error) {
                    reject(error);
                };
                resolve("added to fav");
            }
        )

        })
        
    }

    static getTotalPrice(request) {
        return new Promise((resolve, reject) => {
            pool.query("CALL totalPrice(?)",
                [
                    request.userEmail,
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

    static getFav(request) {
        return new Promise((resolve, reject) => {
            pool.query("CALL getFav(?)",
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

    static removeFavItem(request) {
        return new Promise((resolve, reject) => {
            pool.query("DELETE FROM customer_favourites where customer_favourites.customer_email= ? AND customer_favourites.food_item_id= ? ;",
                [
                    request.userEmail,
                    request.body.item
                ],
                (error, results, fields) => {
                    if (error) {
                        reject(error);
                    };
                    resolve("removed noice");
                }
            )
        })
      
    }

    static createOrder(request) {
        return new Promise((resolve, reject) => {
            const res =pool.query("INSERT INTO `order_cart` (order_cart.customer_email, order_cart.food_item_id, order_cart.order_id) SELECT *, (select max(order_cart.order_id) || 1 from order_cart)  from `customer_cart` where customer_cart.customer_email = ?;",
                [
                    request.userEmail,
                ],
                (error, results, fields) => {
                    if (error) {
                        console.log(res.query);
                        reject(error);
                    };
                    resolve("order created noiceee");
                }
            )
        })
      
    }

    static getCurrentOrder(request) {
        return new Promise((resolve, reject) => {
            pool.query("CALL getCurrentOrder(?)",
                [
                    request.userEmail,
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
    static getDiscount(request) {
        return new Promise((resolve, reject) => {
            pool.query("SELECT discount.discount_id,discount.discount_description, discount.discount_percentage FROM discount where  discount.eligible_price > (?) AND discount.end_date > now() AND discount.start_date < now();",
                [
                    request.body.total,
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

