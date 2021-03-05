let employee;
const {validateEmployee} =require('../../../validation/employee_creation');
describe('employee register form validation',()=>{

    beforeEach(()=>{

        employee ={
            employee_name:"testemp",
            job_post:"test",
            contact_number:"1234569870",
            email:"e@gmail.com",
            password:"test123",
       }

    });
    it('employee cannot be empty',()=>{
        employee.employee_name=""
        const result = validateEmployee(employee)
        expect(result.error.message).toEqual( "\"employee_name\" is not allowed to be empty");

    });

    it('job post must be assigned',()=>{
        employee.job_post=""
        const result = validateEmployee(employee)
        expect(result.error.message).toEqual( "\"job_post\" is not allowed to be empty");

    });

    it('email cannot be empty',()=>{
        employee.email=""
        const result = validateEmployee(employee)
        expect(result.error.message).toEqual( "\"email\" is not allowed to be empty");

    });
    it('contact number must be number',()=>{
        employee.contact_number="aaa";
        const result = validateEmployee(employee)
        expect(result.error.message).toEqual( "\"contact_number\" must be a number");

    });

    it('password len must be greater than 6 chars',()=>{
        employee.password="1234"
        const result = validateEmployee(employee)
        expect(result.error.message).toEqual( "\"password\" length must be at least 6 characters long");

    });




});