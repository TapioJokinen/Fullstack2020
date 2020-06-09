const mongoose = require("mongoose")

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]


const url = `mongodb+srv://dbFullstack:${password}@cluster0.5jkgi.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number
})

const Person = mongoose.model("Person", personSchema)

const newPerson = new Person({
    name: name,
    number: "number",
    id: 52
})

if (process.argv.length === 5) {
    newPerson
        .save()
        .then(res => {
            console.log(`Added ${name}, number ${number} to phonebook`)
            mongoose.connection.close()
        })
} else if (process.argv.length === 3) {
    Person
        .find({})
        .then(res => {
            console.log("phonebook:")
            res.map(person => {
                console.log(`${person.name} ${person.number}`)
            })

        })
}