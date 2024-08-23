import Joi from "joi";

const registerValidator = Joi.object({
    username: Joi.string().min(3).required().messages({
        "any.required": "Tên không được để trống",
        "string.min": "Tên phải nhiều hơn 3 kí tự",
    }),
    email: Joi.string().email().messages({
        "string.email": "Không đúng định dạng email",
    }),
    password: Joi.string().min(5).required().messages({
        "string.min": "Mật khẩu phải nhiều hơn 5 kí tự",
    }),
    role: Joi.string(),
}).options({
    abortEarly: false,
});

const loginValidator = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Không đúng định dạng email",
    }),
    password: Joi.string().required(),
}).options({
    abortEarly: false,
});

export { registerValidator, loginValidator };