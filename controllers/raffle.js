const { Raffle } = require("../db/models/raffle")
const { Article } = require("../db/models/article")
const Exceptions = require("../utils/custom-exceptions")
const { promise } = require("../middlewares/promises")
const { sendMail } = require("../middlewares/sendMail")

exports.addRaffleForm = promise(async (req, res) => {
    const body = req.body
    let shippingPrice = 0

    const country = body.country.toLowerCase()
    const address_ = body.address.toLowerCase()
    const city = body.city.toLowerCase()
    const address = `${address_}, ${city}, ${country}`

    if (country == "switzerland") { shippingPrice = 10 }
    else if (country == "liechtenstein") { shippingPrice = 0 }
    else {
        throw new Exceptions.BadRequset("Shipping services are not available in this state. Shipping is only available in Switzerland and Liechtenstein ")
    }

    const article = await Article.findById(body.articleId)
    if (!article) throw new Exceptions.NotFound("Article not found")

    const totalPrice = shippingPrice + article.price + 10

    const newRaffleForm = new Raffle({
        ...body,
        userId: req.user._id,
        address: address,
        totalPrice: totalPrice
    })

    const message = `Dear ${body.firstName} ${body.lastName}! Thank you for participating in the raffle. You will be contacted when you will win the raffle.`

    await newRaffleForm.save()
    sendMail(body.email, message)
    res.status(200).json({ message: "Successfully added raffle form", newRaffleForm })
})