const {pool} = require('../startup/mysql_database');

module.exports= class Manager {

    //create employee
    static insertEmployee(body) {
        return new Promise((resolve, reject) => {
            pool.query("INSERT INTO `employee`(`employee_name`, `job_post`, `email`, `password`, `contact_number`) VALUES  (?,?,?,?,?)",
                [
                    body.employee_name,
                    body.job_post,
                    body.email,
                    body.password,
                    body.contact_number,
                ],
                function (error, results, fields) {
                    if (error) {
                        reject(error);
                    };
                    resolve(console.log("entered sucessfully"));
                }
            )
        })
    
        
    }

    static  addFoodItem(body) {
        return new Promise((resolve, reject) => {
            pool.query("INSERT INTO `food_item`(`food_item_id`, `food_item_name`, `price`, `description`, `calorie_amount`, `image`) VALUES  (?,?,?,?,?,?)",
                [
                    body.food_item_id,
                    body.food_item_name,
                    body.price,
                    body.description,
                    body.calorie_amount,
                    body.image,
    
                ],
                function (error, results, fields) {
                    if (error) {
                        reject(error);
                    };
                    resolve(console.log("entered sucessfully"));
                }
            )
        })
    
        
    }


    static insertDriver(body) {
        return new Promise((resolve, reject) => {
            pool.query("INSERT INTO `delivery_person`( `name`, `contact_number`, `vehicle_type`, `vehicle_number`, `email`, `password`) VALUES (?,?,?,?,?,?)",
                [
                    body.name,
                    body.contact_number,
                    body.vehicle_type,
                    body.vehicle_number,
                    body.email,
                    body.password
                    
                ],
                function (error, results, fields) {
                    if (error) {
                        reject(error);
                    };
                    resolve(console.log("entered sucessfully"));
                }
            )
        })
    
        
    }

    static addDiscount(body) {
        return new Promise((resolve, reject) => {
            pool.query("INSERT INTO `discount`( `discount_description`, `eligible_price`, `discount_percentage`, `start_date`, `end_date`) VALUES  (?,?,?,?,?)",
                [
                    body.discount_description,
                    body.eligible_price,
                    body.discount_percentage,
                    body.start_date,
                    body.end_date
                ],
                function (error, results, fields) {
                    if (error) {
                        reject(error);
                    };
                    resolve(console.log("entered sucessfully"));
                }
            )
        })
    
        
    }

    

}

