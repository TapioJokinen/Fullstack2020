require("dotenv").config()
const app = express()
const morgan = require("morgan")
const cors = require('cors')
const Person = require("./models/Person")
const config = require('./utils/config')
const logger = require("./utils/logger")
const personRouter = require("./controllers/persons")
const middleware = require("./utils/middleware")
const mongoose = require("mongoose")

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })


app.use("/api/persons", personRouter)

morgan.token('content', function (req, res) { return JSON.stringify(req.body) })

/////////////////////////////////////////////
/////// MIDDLEWARES
/////////////////////////////////////////////
app.use(express.json())
app.use(express.static('build'))
app.use()
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
app.use(cors())
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


const PORT = config.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
