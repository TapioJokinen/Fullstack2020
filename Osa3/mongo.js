require("dotenv").config()
const mongoose = require("mongoose")

mongoose.set('useFindAndModify', false)

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const url = process.env.MONGODB_URL

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(res => {
    console.log("Connected to MongoDB!")
})
.catch(error => {
    console.log("Error connecting to MongoDB", error.message)
})
