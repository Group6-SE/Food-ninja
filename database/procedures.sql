DELIMITER $$
CREATE OR REPLACE PROCEDURE `add_to_cart` (
  `customer_email` VARCHAR (50) ,
  `food_item_id` VARCHAR(6)
  )
BEGIN
    set AUTOCOMMIT = 0;
    INSERT INTO `customer_cart` (`customer_email`,`food_item_id`) VALUES 
    (customer_email,food_item_id);
    commit;
END$$

DELIMITER $$
CREATE OR REPLACE PROCEDURE `add_to_fav` (
  `customer_email` VARCHAR (50) ,
  `food_item_id` VARCHAR(6)
  )
BEGIN
    set AUTOCOMMIT = 0;
    INSERT INTO `customer_favourites` (`customer_email`,`food_item_id`) VALUES 
    (customer_email,food_item_id);
    commit;
END$$

DELIMITER
$$
 CREATE OR REPLACE  PROCEDURE completeOrder(orderID INT )
BEGIN 
   DECLARE id Int ;
   START TRANSACTION;
   INSERT into processed_order(processed_order.order_id,processed_order.customer,processed_order.price,processed_order.order_date) SELECT order_cart.order_id,order_cart.customer_email,sum(food_item.price) , now() from (order_cart left JOIN food_item  on food_item.food_item_id = order_cart.food_item_id ) GROUP by order_cart.order_id HAVING order_cart.order_id = orderID;
   UPDATE order_cart SET order_cart.completed = 'yes' WHERE order_cart.order_id = orderID;
    COMMIT; END$$

DELIMITER $$
CREATE OR REPLACE PROCEDURE `create_customer` (
  `customer_name` VARCHAR(30),
   `address` VARCHAR(50) ,
   `contact_number` INT,
   `email` VARCHAR (50),
   `password` VARCHAR (100) 
   
   
  )
BEGIN
    set AUTOCOMMIT = 0;
    INSERT INTO `customer` (`Customer_name`,`Address`,`Contact_number`,`email`,`password`) VALUES 
    (customer_name,address,contact_number,email,password);
    commit;
END$$


DELIMITER $$
CREATE OR REPLACE PROCEDURE `create_discount` (
    `discount_description` VARCHAR(200),
    `eligible_price` NUMERIC(8,2) ,
    `discount_percentage` NUMERIC(4,2),
    `start_date`  DATETIME,
    `end_date` DATETIME 
   
  )
BEGIN
    set AUTOCOMMIT = 0;
    INSERT INTO `discount` (`discount_description`,`eligible_price`,`discount_percentage`,`start_date`,`end_date`) VALUES 
    (discount_description,eligible_price,discount_percentage,start_date,end_date);
    commit;
END$$


DELIMITER $$
CREATE OR REPLACE PROCEDURE `create_driver` (
    `name` VARCHAR(30),
    `contact_number` INT ,
    `vehicle_type` VARCHAR (20),
    `vehicle_number`  VARCHAR (10),
    `email` VARCHAR(50) ,
    `password` VARCHAR (100) 
   
  )
BEGIN
    set AUTOCOMMIT = 0;
    INSERT INTO `delivery_person` (`name`,`contact_number`,`vehicle_type`,`vehicle_number`,`email`,`password`) VALUES 
    (name,contact_number,vehicle_type,vehicle_number,email,password);
    commit;
END$$


DELIMITER $$
CREATE OR REPLACE PROCEDURE `create_employee` (
  `employee_name` VARCHAR(30),
  `job_post` VARCHAR(50),
   `email` VARCHAR(100) ,
  `password` VARCHAR (100),
   `contact_number` INT
   
  )
BEGIN
    set AUTOCOMMIT = 0;
    INSERT INTO `employee` (`employee_name`,`job_post`,`email`,`password`,`contact_number`) VALUES 
    (employee_name,job_post,email,password,contact_number);
    commit;
END$$


DELIMITER $$
CREATE OR REPLACE PROCEDURE `create_food_item` (
  `food_item_id` VARCHAR(30),
  `food_item_name` VARCHAR(30),
  `price` NUMERIC(6,2),
  `description` VARCHAR(100),
  `calorie_amount` INT,
  `image` BLOB )
BEGIN
    set AUTOCOMMIT = 0;
    INSERT INTO `food_item` (`food_item_id`,`food_item_name`,`price`,`description`,`calorie_amount`,`image`) VALUES 
    (food_item_id,food_item_name,price,description,calorie_amount,image);
    commit;
END$$

DELIMITER $$
 CREATE OR REPLACE  PROCEDURE getAceptedOrders()
   BEGIN 
   SELECT  * from processed_order; end
$$

DELIMITER $$
 CREATE OR REPLACE  PROCEDURE getAllOrder()
   BEGIN 
   SELECT  order_id, order_cart.food_item_id, food_item.food_item_name, food_item.price FROM  order_cart left join food_item on order_cart.food_item_id = food_item.food_item_id  where order_cart.completed ='no'; end
$$

DELIMITER $$
 CREATE OR REPLACE  PROCEDURE getCurrentOrder(userEmail VARCHAR (50))
   BEGIN 
   SELECT  order_id, order_cart.food_item_id, food_item.food_item_name, food_item.price FROM  order_cart left join food_item on order_cart.food_item_id = food_item.food_item_id WHERE order_id in ( SELECT max(order_cart.order_id) from order_cart where customer_email =userEmail); end
$$

DELIMITER
$$
 CREATE OR REPLACE  PROCEDURE getFav(usermail VARCHAR (50))
  BEGIN 
   SELECT customer_favourites.food_item_id, food_item.food_item_name, food_item.price FROM customer_favourites LEFT  JOIN food_item on food_item.food_item_id= customer_favourites.food_item_id WHERE customer_favourites.customer_email = usermail; END
   $$


DELIMITER
$$
 CREATE OR REPLACE  PROCEDURE getMenu()
   BEGIN 
   SELECT `food_item_id`,`food_item_name`,`price`,`description`,`calorie_amount` FROM `food_item` ;END
$$


DELIMITER
$$
 CREATE OR REPLACE  PROCEDURE getcart(usermail VARCHAR (50))
   BEGIN 
    SELECT customer_cart.food_item_id, food_item.food_item_name, food_item.price FROM customer_cart LEFT  JOIN food_item on food_item.food_item_id= customer_cart.food_item_id WHERE customer_cart.customer_email = usermail; END
   $$

DELIMITER
$$
 CREATE OR REPLACE  PROCEDURE getdiscounts(total NUMERIC (8,2))
  BEGIN 
   SELECT discount.discount_id,discount.discount_description, discount.discount_percentage FROM discount where  discount.eligible_price >total AND discount.end_date > now() AND discount.start_date < now(); END

$$

DELIMITER $$
 CREATE OR REPLACE  PROCEDURE getorderByDriver(driverEmail VARCHAR(50))
   BEGIN 
   SELECT  * from processed_order WHERE processed_order.delivery_person =driverEmail ;
end$$

DELIMITER
$$
 CREATE OR REPLACE  PROCEDURE removeCartItem(useremail VARCHAR (50) ,item VARCHAR (6) )
   BEGIN 
   DELETE FROM customer_cart where customer_cart.customer_email= useremail AND customer_cart.food_item_id= item LIMIT 1; END
$$

DELIMITER
$$
 CREATE OR REPLACE  PROCEDURE removeFavItem(useremail VARCHAR (50), item VARCHAR(6))
   BEGIN 
     DELETE FROM customer_favourites where customer_favourites.customer_email= useremail AND customer_favourites.food_item_id= item; END
$$


DELIMITER $$
 CREATE OR REPLACE  PROCEDURE tobeDelivered()
   BEGIN 
   SELECT `order_id`,`customer`,`price`,customer.Address from processed_order LEFT JOIN customer on customer.email = processed_order.customer where processed_order.delivered='no';END 
$$

DELIMITER
$$
 CREATE OR REPLACE  PROCEDURE totalPrice(usermail VARCHAR (50))
   BEGIN 
     SELECT  SUM(food_item.price) as total_price from customer_cart LEFT JOIN food_item ON customer_cart.food_item_id = food_item.food_item_id where customer_cart.customer_email=usermail; END
$$

DELIMITER
$$
 CREATE OR REPLACE  PROCEDURE tranfertoOrder(useremail VARCHAR (50) )
BEGIN 
   DECLARE id Int ;
   DECLARE `_rollback` BOOL DEFAULT 0;
   DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `_rollback` = 1;
   START TRANSACTION;
   SELECT max(order_cart.order_id) INTO id from order_cart;
   IF id is NULL THEN
   set id =0;
   end IF;
   INSERT INTO `order_cart` (order_cart.customer_email, order_cart.food_item_id, order_cart.order_id) SELECT *,(id+1)  from `customer_cart` where customer_cart.customer_email = useremail; 
   DELETE  from `customer_cart` WHERE customer_cart.customer_email = useremail;
   IF `_rollback` THEN
        	ROLLBACK;
  	 ELSE
        	COMMIT;
   	 END IF;
END

$$
$$
DELIMITER $$
 CREATE OR REPLACE  PROCEDURE updateDelivery(orderID INT,driverEmail VARCHAR(50) )
   BEGIN 
   UPDATE processed_order SET processed_order.delivered = 'yes', processed_order.delivery_person = driverEmail  WHERE processed_order.order_id = orderID; END 
$$
