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

exports.getAllArticles = promise(async (req, res) => {
    const articles = await Article.find()
    if (!articles) throw new Exceptions.NotFound("No articles found")

    res.status(200).json({ articles })
})

exports.getSingleArticle = promise(async (req, res) => {
    const body = req.body

    const article = await Article.findById(body.articleId)
    if (!article) throw new Exceptions.NotFound("No article found")

    res.status(200).json({ article })
})