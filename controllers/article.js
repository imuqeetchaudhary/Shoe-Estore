const { Article } = require("../db/models/article")
const Exceptions = require("../utils/custom-exceptions")
const { promise } = require("../middlewares/promises")

exports.addArticle = promise(async (req, res) => {
    const body = req.body

    const newArticle = new Article({
        ...body,
        image: req.file.filename
    })
    await newArticle.save()
    res.status(200).json({ message: "successfully added a new article", newArticle })
})