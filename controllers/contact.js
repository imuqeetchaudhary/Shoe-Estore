const { Contact } = require("../db/models/contact")
const Exceptions = require("../utils/custom-exceptions")
const { promise } = require("../middlewares/promises")

exports.addMessage = promise(async (req, res) => {
    const body = req.body

    const newcontact = new Contact({
        ...body,
        userId: req.user._id
    })

    await newcontact.save()
    res.status(200).json({ message: "Successfully added new contact message", newcontact })
})

exports.getAllMessages = promise(async (req, res) => {
    const contacts = await Contact.find()
    if (!contacts) throw new Exceptions.NotFound("No articles found")

    res.status(200).json({ contacts })
})

exports.getSingleMessage = promise(async (req, res) => {
    const body = req.body

    const contact = await Contact.findById(body.contactId)
    if (!contact) throw new Exceptions.NotFound("No contact found")

    res.status(200).json({ contact })
})