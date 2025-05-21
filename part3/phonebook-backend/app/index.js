const express = require('express')
const morgan = require('morgan')
const app = express()

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.static('dist'))

app.use(express.json())

morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : '-';
});

app.use(morgan(':method :url :status :body'));

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})


const generateId = () => {
    const max = (persons.length + 2) * 10
    const min = persons.length + 1
    return String(Math.floor(Math.random() * (max - min)) + min);
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    const name = body.name
    const number = body.number

    if (!name) {
        return response.status(400).json({ 
            error: 'name missing' 
        })
    }
    

    if (!number) {
        return response.status(400).json({ 
            error: 'number missing' 
        })
    }

    
    if (persons.some(person => person.name === name)) {
        return response.status(409).json({ 
            error: 'name must be unique' 
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person)

    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.get('/info', (request, response) => {
    const date = new Date()
    let info = `<h1>Phonebook has info for ${persons.length} people</h1>`
    info += `<p>${date}</p>`

    response.send(info)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on:  http://localhost:${PORT}`)
}) 