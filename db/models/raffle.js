const mongoose = require("mongoose")
const schema = mongoose.Schema

const raffleSchema = new schema({
    userId: {
        type: schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    articleId: {
        type: schema.Types.ObjectId,
        ref: "Article",
        required: true
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    postCode: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    size: {
        type: Number,
        require: true
    },
    instagram: {
        type: String,
        require: true
    },
    totalPrice: {
        type: Number,
        require: true
    },
    isWinner: {
        type: Boolean,
        default: null
    },
    isPaid: {
        type: Boolean,
        default: null
    }
})

exports.Raffle = mongoose.model("Raffle", raffleSchema)