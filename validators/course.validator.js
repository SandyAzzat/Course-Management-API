const Joi = require("joi");

const courseSchemaValidation = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(500).required(),
    image: Joi.string().uri().optional().allow("", null),
    startDate: Joi.date().optional().allow(null),
    endDate: Joi.date().optional().allow(null),
    price: Joi.number().positive().required(),
});

module.exports = courseSchemaValidation;

// const Joi = require("joi");

// const courseSchema = Joi.object({
//     title: Joi.string().min(3).max(100).required(),

//     description: Joi.string().min(10).max(500).required(),

//     image: Joi.string()
//         .pattern(/^https?:\/\/.+|^data:image\/[a-zA-Z]+;base64,.+/)
//         .allow("", null),

//     startDate: Joi.date().optional().allow(null),

//     endDate: Joi.date().optional().allow(null),

//     price: Joi.number().positive().required(),

// });

// module.exports = courseSchema;
