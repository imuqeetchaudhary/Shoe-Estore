const yup = require("yup")

exports.addContactSchema = yup.object({
    message: yup.string().required()
})

exports.getSingleContact = yup.object({
    contactId: yup.string().required()
})