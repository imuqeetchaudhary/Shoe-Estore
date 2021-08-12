const express = require("express")
const router = express.Router()
const raffle = require("../controllers/raffle")
const { authentication } = require("../middlewares/isAuth")
const { validation } = require("../middlewares/validation")
const { addRaffleSchema, declareWinnerSchema } = require("../validation/raffle")

router
    .post("/add-form", authentication,
        validation(addRaffleSchema),
        raffle.addRaffleForm
    )

    .get("/get-all-for-admin",
        authentication,
        raffle.getAllRaffles
    )

    .get("/get-all-for-user",
        authentication,
        raffle.getRaffleForAuthUser
    )

    .patch("/declare-winner",
        authentication,
        validation(declareWinnerSchema),
        raffle.declareWinner
    )

    .post("/create-payment-intend",
        authentication,
        validation(declareWinnerSchema),
        raffle.createPaymentIntend
    )

module.exports = router