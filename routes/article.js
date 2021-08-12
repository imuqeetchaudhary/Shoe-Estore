const express = require("express")
const router = express.Router()
const article = require("../controllers/article")
const { Article } = require("../db/models/article")
const { authentication } = require("../middlewares/isAuth")
const { upload } = require("../middlewares/upload")
const { validation } = require("../middlewares/validation")
const { addArticleSchema, getSingleArticle, updateArticle } = require("../validation/article")

router
    .post("/add", validation(addArticleSchema), upload.single("image"), article.addArticle)
    .get("/get-raffle", authentication, article.getAllRaffles)
    .get("/get-all-sneakers", authentication, article.getAllSneakers)
    .post("/get-single", authentication, validation(getSingleArticle), article.getSingleArticle)
    .patch("/update", authentication, validation(updateArticle), article.updateArticle)
    
module.exports = router