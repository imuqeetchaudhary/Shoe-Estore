const yup = require("yup")

exports.addArticleSchema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    image: yup.string().required(),
    style: yup.string().required(),
    releaseDate: yup.date().required(),
    price: yup.string().required()
})