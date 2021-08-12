const { Raffle } = require("../db/models/raffle")
const { Article } = require("../db/models/article")
const Exceptions = require("../utils/custom-exceptions")
const { promise } = require("../middlewares/promises")
const { sendMail } = require("../middlewares/sendMail")
const stripe = require("stripe")(
    "sk_test_51J1POvClkiKKoyU1EwrqRkPchsMA2eXdwSeI7VCQiqCOzOVwqOWoWGS8qCEj1fVQA7WCx1nnoeJD3KfPJHEE0XOG00uMs4G6yS"
)

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
        throw new Exceptions.BadRequset("Shipping services are not available in this state. Shipping is only available in Switzerland and Liechtenstein.")
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

exports.getAllRaffles = promise(async (req, res) => {
    const raffle = await Raffle.find()
    if (!raffle) throw new Exceptions.NotFound("No raffle found")

    res.status(200).json({ raffle })
})

exports.getRaffleForAuthUser = promise(async (req, res) => {
    const raffle = await Raffle.find({ userId: req.user._id, isWinner: true })
    if (!raffle) throw new Exceptions.NotFound("No raffle found")

    res.status(200).json({ raffle })
})

exports.declareWinner = promise(async (req, res) => {
    const body = req.body

    const raffle = await Raffle.findById(body.raffleId).populate("userId")
    if (!raffle) throw new Exceptions.NotFound("No raffle found")
    console.log(raffle);

    const updateRaffle = await Raffle.updateOne(
        { _id: body.raffleId },
        {
            $set: {
                isWinner: true
            }
        }
    )

    const email = raffle.userId.email
    const name = raffle.userId.name
    const message = `Dear ${name}! Congratulations! You've won the raffle. Kindly visit the website to buy the article.`

    sendMail(email, message)

    res.status(200).json({ message: "Successfully updated winning status" })
})

exports.createPaymentIntend = promise(async (req, res) => {
    const body = req.body

    const raffle = await Raffle.findById(body.raffleId)
    if (!raffle) throw new Exceptions.NotFound("No raffle found")

    const paymentIntent = await stripe.paymentIntents.create({
        amount: (raffle.totalPrice * 100),
        currency: "usd",
        metadata: {
            integration_check: "accept_a_payment_for_shoe_estore",
        },
        receipt_email: req.user.email,
        payment_method_types: ["card"],
    })

    res.status(200).json({
        message: "Successfully created payment intend",
        client_secret: paymentIntent["client_secret"],
    })
})

exports.confirmPayment = promise(async (req, res) => {
    const body = req.body

    await Raffle.updateOne(
        { _id: body.raffleId },
        {
            $set: {
                isPaid: true
            }
        }
    )
    res.status(200).json({ message: "Successfully updated payment status of raffle" })
})