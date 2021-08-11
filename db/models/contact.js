const mongoose = require("mongoose")
const schema = mongoose.Schema

const contactSchema = new schema({
    userId: {
        type: schema.Types.ObjectId,
        required: true
    },
    message: {
        type: String,
        require: true
    }
})

exports.Contact = mongoose.model("Contact", contactSchema)