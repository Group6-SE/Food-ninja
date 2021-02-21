DROP SCHEMA IF EXISTS ninja;
CREATE  database ninja;
use ninja;

DROP TABLE IF EXISTS `manager` ;
CREATE TABLE `manager` (
  `manager_id` INT  NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `manager_name` varchar(30) NOT NULL,
  `contact_number` int NOT NULL,
  `email` VARCHAR(50) NOT  NULL UNIQUE ,
  `password` VARCHAR (100) NOT NULL 

);

INSERT INTO `manager`(`manager_name`, `contact_number`, `email`, `password`) VALUES ('admin', 0987654321, 'admin@gmail.com', '$2a$05$ser6ZE59apqmW3zRe.Ok5O.L7Sf8WFNl7y3VuARLFnfona135wtNS');

DROP TABLE IF EXISTS `employee` ;

CREATE TABLE `employee` (
  `employee_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  `employee_name` varchar(30) NOT NULL,
  `job_post` varchar(50) NOT NULL,
  `email` VARCHAR(50) NOT  NULL UNIQUE ,
  `password` VARCHAR (100) NOT NULL, 
  `contact_number` int NOT NULL
);

DROP TABLE IF EXISTS `customer` ;

CREATE TABLE `customer` (
  `customer_id` int NOT Null AUTO_INCREMENT PRIMARY  KEY ,
  `customer_name` varchar(30) NOT NULL,
  `address` varchar(50) NOT NULL,
  `loyalty_points` int NOT NULL,
  `contact_number` int NOT NULL,
  `email` VARCHAR(50) NOT  NULL UNIQUE ,
  `password` VARCHAR (100) NOT NULL
);

ALTER TABLE customer MODIFY COLUMN `loyalty_points` INT  DEFAULT 100;

DROP TABLE IF EXISTS `delivery_person` ;

CREATE TABLE `delivery_person` (
  `d_id` INT NOT NULL PRIMARY KEY ,
  `name` varchar(30) NOT NULL,
  `contact_number` int NOT NULL,
  `vehicle_type` varchar(20) NOT NULL,
  `vehicle_number` varchar(10) NOT NULL,
  `email` VARCHAR(50) NOT  NULL UNIQUE ,
  `password` VARCHAR (100) NOT NULL 

);

DROP TABLE IF EXISTS `food_item` ;


CREATE TABLE `food_item` (
  `food_item_id` VARCHAR (30) PRIMARY KEY,
  `food_item_name` varchar(30) NOT NULL,
  `price` NUMERIC (6,2) NOT NULL,
  `description` varchar(100) NOT NULL,
  `calorie_amount` int NOT NULL,
  `image` blob 
);

DROP TABLE IF EXISTS `customer_cart` ;

CREATE TABLE `customer_cart` (
  `customer_email` VARCHAR (50) NOT  NULL ,
  `food_item_id` varchar(6) NOT NULL,
  FOREIGN KEY (`customer_email`) REFERENCES customer(`email`),
  FOREIGN KEY (`food_item_id`) REFERENCES food_item(`food_item_id`)
);

DROP TABLE IF EXISTS `customer_favourites` ;

CREATE TABLE `customer_favourites` (
  `customer_email` VARCHAR (50) NOT  NULL ,
  `food_item_id` varchar(6) NOT NULL,
  PRIMARY KEY (`customer_email`, `food_item_id`),
  FOREIGN KEY (`customer_email`) REFERENCES customer(`email`),
  FOREIGN KEY (`food_item_id`) REFERENCES food_item(`food_item_id`)
);

DROP TABLE IF EXISTS `discount` ;

CREATE TABLE `discount` (
  `discount_id`INT  NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  `discount_description` varchar(200) NOT NULL,
  `eligible_price` double(8,2) NOT NULL,
  `discount_percentage` double(4,2) NOT NULL,
  `start_date` DATETIME   NOT NULL,
  `end_date` DATETIME   NOT NULL
);

DROP TABLE IF EXISTS `order_cart` ;

CREATE  TABLE `order_cart`(
  `order_id`  INT NOT NULL ,
  `customer_email` VARCHAR(50) not NULL ,
  `food_item_id`  varchar(6),
  `completed` VARCHAR(5) DEFAULT 'no'
);

DROP TABLE IF EXISTS `processed_order` ;

CREATE  TABLE  `processed_order`(
  `order_id` INT NOT NULL PRIMARY key,
  `customer` VARCHAR (50),
  `price` NUMERIC(8,2) not NULl, 
  `order_date`  DATE,
  `delivered` VARCHAR(5) DEFAULT 'no',
  `delivery_person` VARCHAR(50) DEFAULT NULL 
);