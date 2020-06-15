const personRouter = require('express').Router()
const Person = require("../models/Person")

/////////////////////////////////////////////
/////// GET - /api/persons
/////////////////////////////////////////////
personRouter.get("/", (req, res, next) => {
    Person.find({})
        .then(people => {
            res.send(people)
        })
})

/////////////////////////////////////////////
/////// GET - /info
/////////////////////////////////////////////
personRouter.get("/info", (req, res) => {
    let i = 0
    Person.find({}).then(people => {
        people.forEach(p => i += 1)
        const content = `<div><p>Phonebook has info for ${i} people</p><p>${new Date()}</p></div>`
        res.send(content)
    })
})

/////////////////////////////////////////////
/////// GET - /api/persons/:id
/////////////////////////////////////////////
personRouter.get("/:id", (req, res) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

/////////////////////////////////////////////
/////// DELETE - /api/persons/:id
/////////////////////////////////////////////
personRouter.delete("/:id", (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

/////////////////////////////////////////////
/////// POST - /api/persons
/////////////////////////////////////////////
personRouter.post("/", (req, res, next) => {
    const person = req.body

    // If number or name missing, return error
    if (person.name === "" || person.number === "") {
        return res.status(400).json({
            error: 'content missing'
        })
    } else if (person.name.length < 3 || person.number < 8) {
        return res.status(400).json({
            error: 'Name or number is invalid'
        })
    }

    Person.find({ $or: [{ name: person.name }, { number: person.number }] })
        .then(response => {
            return res.status(400).json({
                error: 'Name or number is already in the database'
            })
        })

    const newPerson = Person({
        name: person.name,
        number: person.number,
    })

    newPerson.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

/////////////////////////////////////////////
/////// PUT - /api/persons/:id
/////////////////////////////////////////////
personRouter.put("/:id", (req, res, next) => {
    const person = req.body

    const updatedPerson = {
        name: person.name,
        number: person.number,
        id: person.id
    }

    Person.findByIdAndUpdate(person.id, updatedPerson, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})

module.exports = { personRouter }