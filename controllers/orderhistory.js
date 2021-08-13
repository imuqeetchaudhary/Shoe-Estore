const { OrderHistory } = require("../db/models/orderhistory")
const { Article } = require("../db/models/article")
const Exceptions = require("../utils/custom-exceptions")
const { promise } = require("../middlewares/promises")
const stripe = require("stripe")(
    "sk_test_51J1POvClkiKKoyU1EwrqRkPchsMA2eXdwSeI7VCQiqCOzOVwqOWoWGS8qCEj1fVQA7WCx1nnoeJD3KfPJHEE0XOG00uMs4G6yS"
)

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
    else { throw new Exceptions.BadRequset("Shipping services are not available in this state. Shipping is only available in Switzerland and Liechtenstein.") }

    const totalPrice = shippingPrice + article.price + 10

    const newOrderHistory = new OrderHistory({
        ...body,
        userId: req.user._id,
        shippingAddress: shippingAddress,
        shippingPrice: shippingPrice,
        totalPrice: totalPrice,
    })

    const paymentIntent = await stripe.paymentIntents.create({
        amount: totalPrice * 100,
        currency: "usd",
        metadata: {
            integration_check: "accept_a_payment_for_shoe_estore",
        },
        receipt_email: req.user.email,
        payment_method_types: ["card"],
    })

    await newOrderHistory.save()
    res.status(200).json({
        message: "Successfully created order history",
        client_secret: paymentIntent["client_secret"],
        newOrderHistory,
        article
    })
})

exports.confirmPayment = promise(async (req, res) => {
    const body = req.body

    await OrderHistory.updateOne(
        { _id: body.orderHistoryId },
        {
            $set: {
                isPaid: true
            }
        }
    )
    res.status(200).json({ message: "Successfully updated payment status of order history" })
})

exports.getAllHistories = promise(async (req, res) => {
    const orderhistory = await OrderHistory.find()
    if (!orderhistory) throw new Exceptions.NotFound("No receipt found")
    res.status(200).json({ orderhistory })
})

exports.getAllHistoriesForAnySpecificUser = promise(async (req, res) => {
    const orderhistory = await OrderHistory.find({ userId: req.user._id }).populate("articleId")
    if (!orderhistory) throw new Exceptions.NotFound("No receipt found")
    res.status(200).json({ orderhistory })
})

exports.getSingleHistory = promise(async (req, res) => {
    const body = req.body

    const orderhistory = await OrderHistory.findById(body.orderHistoryId).populate("articleId").populate("userId")
    if (!orderhistory) throw new Exceptions.NotFound("No receipt found")

    res.status(200).json({ orderhistory })
})