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
            pool.query("CALL add_to_cart(?,?)",
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
            pool.query("CALL getcart(?)",
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
            pool.query("CALL add_to_fav(?,?)",
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
            pool.query("CALL removeFavItem(?,?)",
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
            pool.query("CALL tranfertoOrder(?)",
                [
                    request.userEmail,
                ],
                (error, results, fields) => {
                    if (error) {
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
            pool.query("CALL getdiscounts(?)",
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

