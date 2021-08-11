const express = require("express")
const router = express.Router()
const contact = require("../controllers/contact")
const { authentication } = require("../middlewares/isAuth")
const { validation } = require("../middlewares/validation")
const { addContactSchema, getSingleContact } = require("../validation/contact")

router
    .post("/add", authentication, validation(addContactSchema), contact.addMessage)
    .get("/get-all", authentication, contact.getAllMessages)
    .post("/get-single", authentication, validation(getSingleContact), contact.getSingleMessage)

module.exports = router