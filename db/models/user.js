const mongoose = require("mongoose")
const schema = mongoose.Schema

const userSchema = new schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    address: {
        type: String,
        require: true
    },
    deliveryAddress: {
        type: String,
        require: true
    },
    masterCardNumber: {
        type: String,
        require: true
    }
})

exports.User = mongoose.model("User", userSchema)