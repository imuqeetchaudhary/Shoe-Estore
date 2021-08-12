const yup = require("yup")

exports.addArticleSchema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    image: yup.string().required(),
    style: yup.string().required(),
    type: yup.string().required(),
    availableSizes: yup.string().required(),
    releaseDate: yup.date().required(),
    price: yup.number().required()
})

exports.getSingleArticle = yup.object({
    articleId: yup.string().required()
})

exports.updateArticle = yup.object({
    articleId: yup.string().required(),
    name: yup.string(),
    description: yup.string(),
    style: yup.string(),
    type: yup.string(),
    availableSizes: yup.string(),
    releaseDate: yup.date(),
    price: yup.number()
})