const yup = require("yup")

exports.registerSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(5).max(10)
})

exports.loginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
})

exports.updateProfileSchema = yup.object({
    name: yup.string(),
    email: yup.string().email(),
    password: yup.string().min(5).max(10),
    address: yup.string(),
    deliveryAddress: yup.string(),
    masterCardNumber: yup.string()
})