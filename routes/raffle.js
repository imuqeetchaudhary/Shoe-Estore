const express = require("express")
const router = express.Router()
const raffle = require("../controllers/raffle")
const { authentication } = require("../middlewares/isAuth")
const { validation } = require("../middlewares/validation")
const { addRaffleSchema } = require("../validation/raffle")

router
    .post("/add-form", authentication, validation(addRaffleSchema), raffle.addRaffleForm)
    .get("/get-all-for-admin", authentication, raffle.getAllRaffles)
    .get("/get-all-for-user", authentication, raffle.getRaffleForAuthUser)

module.exports = router