const express = require("express")
const router = express.Router()
const orderhistory = require("../controllers/orderhistory")
const { authentication } = require("../middlewares/isAuth")
const { validation } = require("../middlewares/validation")
const {
    addOrderHistorySchema,
    confirmPaymentSchema,
    getSingleSchema
} = require("../validation/orderhistory")

router
    .post("/add", authentication, validation(addOrderHistorySchema), orderhistory.addHistory)
    .patch("/confirm-payment", authentication, validation(confirmPaymentSchema), orderhistory.confirmPayment)
    .get("/get-all", authentication, orderhistory.getAllHistories)
    .get("/get-all-for-auth-user", authentication, orderhistory.getAllHistoriesForAnySpecificUser)
    .post("/get-single", authentication, validation(getSingleSchema), orderhistory.getSingleHistory)

module.exports = router