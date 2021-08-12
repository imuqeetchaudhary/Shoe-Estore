const yup = require("yup")

exports.addRaffleSchema = yup.object({
    articleId: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required(),
    address: yup.string().required(),
    city: yup.string().required(),
    country: yup.string().required(),
    postCode: yup.string().required(),
    gender: yup.string().required(),
    size: yup.number().required(),
    instagram: yup.string(),
})