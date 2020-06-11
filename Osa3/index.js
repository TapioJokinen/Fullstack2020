require("dotenv").config()
const express = require('express')
const morgan = require("morgan")
const cors = require('cors')

const Person = require("./models/Person")

const app = express()

morgan.token('content', function (req, res) { return JSON.stringify(req.body) })

/////////////////////////////////////////////
/////// MIDDLEWARES
/////////////////////////////////////////////
app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
app.use(cors())

/////////////////////////////////////////////
/////// GET - /api/persons
/////////////////////////////////////////////
app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then(people => {
      res.send(people)
    })
})

/////////////////////////////////////////////
/////// GET - /info
/////////////////////////////////////////////
app.get("/info", (req, res) => {
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
app.get("/api/persons/:id", (req, res) => {
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
app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

/////////////////////////////////////////////
/////// POST - /api/persons
/////////////////////////////////////////////
app.post("/api/persons/", (req, res, next) => {
  const person = req.body
  console.log(person)

  // If number or name missing, return error
  if (person.name === "" || person.number === "") {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  Person.find({ name: person.name }).then(result => {
    return res.status(400).json({
      error: 'This person is already in database'
    })
  })
    .catch(error => next(error))

  const newPerson = Person({
    name: person.name,
    number: person.number,
    id: person.id
  })

  newPerson.save().then(savedPerson => {
    res.json(savedPerson)
  })
})

/////////////////////////////////////////////
/////// PUT - /api/persons/:id
/////////////////////////////////////////////
app.put("/api/persons/:id", (req, res, next) => {
  const person = req.body

  const updatedPerson = {
    name: person.name,
    number: person.number
  }

  Person.findByIdAndUpdate(req.params.id, updatedPerson, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

/////////////////////////////////////////////
/////// MIDDLEWARES
/////////////////////////////////////////////
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
