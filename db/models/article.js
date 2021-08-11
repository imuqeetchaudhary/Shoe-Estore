const mongoose = require("mongoose")
const schema = mongoose.Schema

const artcleSchema = new schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    style: {
        type: String,
        require: true
    },
    availableSizes: [{
        type: String,
        require: true
    }],
    releaseDate: {
        type: Date,
        require: true
    },
    price: {
        type: Number,
        default: false
    }
})

exports.Article = mongoose.model("Article", artcleSchema)