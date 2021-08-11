const { Article } = require("../db/models/article")
const Exceptions = require("../utils/custom-exceptions")
const { promise } = require("../middlewares/promises")

exports.addArticle = promise(async (req, res) => {
    const body = req.body
    // const availableSizes = ["6","7","8","9","10","11","12"]

    const newArticle = new Article({
        ...body,
        image: req.file.filename,
        // availableSizes: availableSizes
    })
    await newArticle.save()
    res.status(200).json({ message: "successfully added a new article", newArticle })
})

exports.getAllRaffles = promise(async (req, res) => {
    const articles = await Article.find({ type: "raffle" })
    if (!articles) throw new Exceptions.NotFound("No articles found")

    res.status(200).json({ articles })
})

exports.getAllSneakers = promise(async (req, res) => {
    const articles = await Article.find({type: "sneakers"})
    if (!articles) throw new Exceptions.NotFound("No articles found")

    res.status(200).json({ articles })
})

exports.getSingleArticle = promise(async (req, res) => {
    const body = req.body

    const article = await Article.findById(body.articleId)
    if (!article) throw new Exceptions.NotFound("No article found")

    res.status(200).json({ article })
})