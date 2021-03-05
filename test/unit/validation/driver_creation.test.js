let driver;
const {validateDriver} =require('../../../validation/driver_creation');
describe('driver register form validation',()=>{

    beforeEach(()=>{

        driver ={
            name:"drivername",
            contact_number:"1234569870",
            vehicle_type:"type",
            vehicle_number:"num",
            email:"d@gmail.com",
            password: "test123"
       }

    });
    it('driver name cannot be empty',()=>{
        driver.name=""
        const result = validateDriver(driver)
        expect(result.error.message).toEqual( "\"name\" is not allowed to be empty");

    });
    it('contact number must be number',()=>{
        driver.contact_number="aaa";
        const result = validateDriver(driver)
        expect(result.error.message).toEqual( "\"contact_number\" must be a number");

    });

    it('vehicle number cannot be empty',()=>{
        driver.vehicle_number =""
        const result = validateDriver(driver)
        expect(result.error.message).toEqual( "\"vehicle_number\" is not allowed to be empty");

    });

    it('email cannot be empty',()=>{
        driver.email=""
        const result = validateDriver(driver)
        expect(result.error.message).toEqual( "\"email\" is not allowed to be empty");

    });
    

    it('password len must be greater than 6 chars',()=>{
        driver.password="1234"
        const result = validateDriver(driver)
        expect(result.error.message).toEqual( "\"password\" length must be at least 6 characters long");

    });




});