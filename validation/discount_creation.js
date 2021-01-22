const Joi = require('joi');


function validateDiscount(discount){
  
    const now = Date.da;
    console.log(now);
    const schema = Joi.object({
        'discount_description'        : Joi.string().required().max(200),
        'eligible_price'        : Joi.number().precision(2).required(),
        'discount_percentage' :Joi.number().precision(2).required(),
        'start_date'            : Joi.date().min('now').required(),
        'end_date'               : Joi.date().min('now').required()
   
    });

    return schema.validate(discount);
}

exports.validateDiscount = validateDiscount;    