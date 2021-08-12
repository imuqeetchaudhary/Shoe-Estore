const mongoose = require("mongoose")
const schema = mongoose.Schema

const orderHistorySchema = new schema({
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
    sizeSelected: {
        type: String,
        require: true
    },
    condition: {
        type: String,
        default: "New. 100% authentic"
    },
    shippingAddress: {
        type: String
    },
    shippingPrice: {
        type: Number
    },
    importDuties: {
        type: Number,
        default: 0
    },
    taxes: {
        type: Number,
        default: 0
    },
    processingFee: {
        type: Number,
        default: 10
    },
    totalPrice: {
        type: Number
    },
    isPaid: {
        type: Boolean,
        default: false
    }
})

exports.OrderHistory = mongoose.model("OrderHistory", orderHistorySchema)