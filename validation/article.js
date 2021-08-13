const yup = require("yup")

exports.addArticleSchema = yup.object({
    name: yup.string(),
    description: yup.string(),
    image: yup.string(),
    style: yup.string(),
    type: yup.string(),
    availableSizes: yup.string(),
    releaseDate: yup.date(),
    price: yup.number()
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