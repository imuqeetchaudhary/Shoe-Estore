const express = require("express")
const router = express.Router()
const article = require("../controllers/article")
const { authentication } = require("../middlewares/isAuth")
const { upload } = require("../middlewares/upload")
const { validation } = require("../middlewares/validation")
const { addArticleSchema, getSingleArticle } = require("../validation/article")

router
    .post("/add", validation(addArticleSchema), upload.single("image"), article.addArticle)
    .get("/get-all", authentication, article.getAllArticles)
    .post("/get-single", authentication, validation(getSingleArticle), article.getSingleArticle)
    
module.exports = router