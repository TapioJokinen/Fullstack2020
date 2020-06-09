const express = require('express')
const morgan = require("morgan")
const cors = require('cors')


const app = express()

morgan.token('content', function (req, res) { return JSON.stringify(req.body)})

app.use(express.json())
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
  res.send(phonebook)
})

app.get("/info", (req, res) => {
  let i = 0
  phonebook.persons.map(p => i += 1)
  const content = `<div><p>Phonebook has info for ${i} people</p><p>${new Date()}</p></div>`
  res.send(content)
})

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  const person = phonebook.persons.find(person => person.id === id)

  if (person) {
      res.send(person)
  } else {
      res.status(404).end()
  }
})

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  phonebook.persons = phonebook.persons.filter(person => person.id !== id)
  res.status(204).end()
})

app.post("/api/persons/", (req, res) => {
  const person = req.body

  // If number or name missing, return error
  if (!person.name || !person.number) {
      return res.status(400).json({ 
          error: 'content missing' 
        })
  }

  // Check if name is already in phonebook
  phonebook.persons.forEach(p => {
      if (p.name === person.name) {
          return res.status(400).json({ 
              error: 'Name is already in phonebook' 
            })
      }
  });

  // Generate random id for person
  const getRandomArbitrary = (min, max) =>  {
      return Math.floor(Math.random() * (max - min) + min);
    }

  const newPerson = {
      name: person.name,
      number: person.number,
      id: getRandomArbitrary(432, 92647129)
  }

  phonebook.persons = phonebook.persons.concat(newPerson)

  res.json(person)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})