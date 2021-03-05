let customer;
const {validateCustomer} =require('../../../validation/customer_register');
describe('customer register form validation',()=>{

    beforeEach(()=>{

        customer ={
               customer_name:"saman",
               address:"address",
               contact_number:"1234569870",
               email:"s@gmail.com",
               password:"test123"  
       }

    });
    it('customer cannot be empty',()=>{
        customer.customer_name=""
        const result = validateCustomer(customer)
        expect(result.error.message).toEqual( "\"customer_name\" is not allowed to be empty");

    });

    it('address cannot be empty',()=>{
        customer.address=""
        const result = validateCustomer(customer)
        expect(result.error.message).toEqual( "\"address\" is not allowed to be empty");

    });

    it('email cannot be empty',()=>{
        customer.email=""
        const result = validateCustomer(customer)
        expect(result.error.message).toEqual( "\"email\" is not allowed to be empty");

    });
    it('contact number must be number',()=>{
        customer.contact_number="aaa";
        const result = validateCustomer(customer)
        expect(result.error.message).toEqual( "\"contact_number\" must be a number");

    });

    it('password len must be greater than 6 chars',()=>{
        customer.password="1234"
        const result = validateCustomer(customer)
        expect(result.error.message).toEqual( "\"password\" length must be at least 6 characters long");

    });




});