const express = require("express")
const bodyParser = require("body-parser")
const dbConnect = require("./db/connection");
const user = require("./routes/user")
const article = require("./routes/article")
const contact = require("./routes/contact")
const orderhistory = require("./routes/orderhistory")
const cors = require("cors")

dbConnect();
const app = express()

app.use(express.static(__dirname + "/upload"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.get("/", async (req, res) => {
    res.json({ message: "Shoe Estore Rest Api" })
})

app.use("/user", user)
app.use("/article", article)
app.use("/contact", contact)
app.use("/order-history", orderhistory)

module.exports = { app }