const {validateDiscount} =require('../../../validation/discount_creation');
let discount;
describe('discount validation process',()=>{

    beforeEach(()=>{

        discount ={
            discount_description:"test",
            eligible_price:"1000",
            discount_percentage:"10",
            start_date:"2021-03-10 22:27:08",
            end_date:"2021-03-15 10:27:08"
       }

    });
    it('discount description cannot be empty',()=>{
        discount.discount_description=""
        const result = validateDiscount(discount)
        expect(result.error.message).toEqual( "\"discount_description\" is not allowed to be empty");

    });

    it('eligible price must be a decimal value',()=>{
        discount.eligible_price="aaa"
        const result = validateDiscount(discount)
        expect(result.error.message).toEqual( "\"eligible_price\" must be a number");

    });

    it('discount percentage must be less than 100',()=>{
        discount.discount_percentage="200"
        const result = validateDiscount(discount)
        expect(result.error.message).toEqual( "\"discount_percentage\" must be less than or equal to 100");

    });

    it('end date validation check', ()=>{
        discount.end_date = "2021-02-20 22:27:08"
        const result = validateDiscount(discount);
        expect(result.error.message).toEqual("\"end_date\" must be greater than or equal to \"now\"");

    });

    it('start date validation check', ()=>{
        discount.start_date = "2021-02-20 22:27:08"
        const result = validateDiscount(discount);
        expect(result.error.message).toEqual("\"start_date\" must be greater than or equal to \"now\"");

    });






});