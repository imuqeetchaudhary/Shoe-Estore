const mongoose = require("mongoose")
const schema = mongoose.Schema

const contactSchema = new schema({
    userId: {
        type: schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        require: true
    }
})

exports.Contact = mongoose.model("Contact", contactSchema)