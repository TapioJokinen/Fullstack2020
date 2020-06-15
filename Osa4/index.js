const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require("./utils/config")
const logger = require('./utils/logger')
const blogRouter = require("./controllers/blog")

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        logger.info("connected to MongoDB!")
    }).catch(() => {
        logger.error("Error while connecting to MongoDB")
    })

app.use(express.json())
app.use("/api/blogs", blogRouter)
app.use(cors())


const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})