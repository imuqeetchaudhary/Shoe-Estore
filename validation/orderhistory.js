const yup = require("yup")

exports.addOrderHistorySchema = yup.object({
    articleId: yup.string().required(),
    sizeSelected: yup.number().required(),
    shippingAddress: yup.string().required(),
    shippingState: yup.string().required()
})

exports.confirmPaymentSchema = yup.object({
    orderHistoryId: yup.string().required()
})

exports.getSingleSchema = yup.object({
    orderHistoryId: yup.string().required()
})