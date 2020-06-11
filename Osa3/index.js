require("dotenv").config()
const express = require('express')
const morgan = require("morgan")
const cors = require('cors')

const Person = require("./models/Person")

const app = express()

morgan.token('content', function (req, res) { return JSON.stringify(req.body)})

app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content' ))
app.use(cors())

const phonebook = {
  "persons": [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    }
  ]
}

app.get("/api/persons", (req, res) => {
  Person.find({}).then(people => {
    console.log(people)
    res.send(people)
  })
})

app.get("/info", (req, res) => {
  let i = 0
  Person.find({}).then(people => {
    console.log(people)
  })
  const content = `<div><p>Phonebook has info for ${i} people</p><p>${new Date()}</p></div>`
  res.send(content)
})

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then(person => {
    res.json(person)
  })
})

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  phonebook.persons = phonebook.persons.filter(person => person.id !== id)
  res.status(204).end()
})

app.post("/api/persons/", (req, res) => {
  const person = req.body

  // If number or name missing, return error
  if (person.name === undefined || person.number === undefined) {
      return res.status(400).json({ 
          error: 'content missing' 
        })
  }

  Person.find(person.name).then(res => {
    return res.status(400).json({ 
      error: 'This person is already in database' 
    })
  })

  // Generate random id for person
  const getRandomArbitrary = (min, max) =>  {
      return Math.floor(Math.random() * (max - min) + min);
    }

  const newPerson = Person({
    name: person.name,
    number: person.number,
    id: person.id
  })

  newPerson.save().then(savedPerson => {
    res.json(savedPerson)
  })
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
