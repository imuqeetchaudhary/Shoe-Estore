const { OrderHistory } = require("../db/models/orderhistory")
const { Article } = require("../db/models/article")
const Exceptions = require("../utils/custom-exceptions")
const { promise } = require("../middlewares/promises")

exports.addHistory = promise(async (req, res) => {
    const body = req.body
    let shippingPrice = 0
    const shippingState = body.shippingState.toLowerCase()
    const address = body.shippingAddress.toLowerCase()
    const shippingAddress = `${address}, ${shippingState}`

    const article = await Article.findById(body.articleId)
    if (!article) throw new Exceptions.NotFound("No article found")

    if (shippingState == "switzerland") { shippingPrice = 10 }
    else if (shippingState == "liechtenstein") { shippingPrice = 0 }
    else { throw new Exceptions.BadRequset("Shipping services are not available in this state") }

    const totalPrice = shippingPrice + article.price + 10

    const newOrderHistory = new OrderHistory({
        ...body,
        userId: req.user._id,
        shippingAddress: shippingAddress,
        shippingPrice: shippingPrice,
        totalPrice: totalPrice,
    })
    await newOrderHistory.save()
    res.status(200).json({ message: "Successfully created order history", newOrderHistory, article })
})