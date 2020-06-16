const config = require("./utils/config")
const express = require('express')
const app = express()
const cors = require('cors')

// Routers
const blogRouter = require("./controllers/blog")
const usersRouter = require('./controllers/users')

// Utils
const middleware = require("./utils/middleware")
const logger = require('./utils/logger')

// Database
const mongoose = require('mongoose')

logger.info("connecting to", config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        logger.info("connected to MongoDB!")
    }).catch(() => {
        logger.error("Error while connecting to MongoDB")
    })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use("/api/blogs", blogRouter)
app.use("/api/users", usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app