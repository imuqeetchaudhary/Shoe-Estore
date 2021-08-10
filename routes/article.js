const express = require("express")
const router = express.Router()
const article = require("../controllers/article")
const { authentication } = require("../middlewares/isAuth")
const { upload } = require("../middlewares/upload")
const { validation } = require("../middlewares/validation")
const { addArticleSchema } = require("../validation/article")

router
    .post("/add", validation(addArticleSchema), upload.single("image"), article.addArticle)

module.exports = router