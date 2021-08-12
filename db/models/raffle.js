const mongoose = require("mongoose")
const schema = mongoose.Schema

const raffleSchema = new schema({
    userId: {
        type: schema.Types.ObjectId,
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
    }
})

exports.Raffle = mongoose.model("Raffle", raffleSchema)