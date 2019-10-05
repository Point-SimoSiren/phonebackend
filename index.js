const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(morgan('tiny'))

let persons = [
    {
        id: 1,
        name: "Tauno",
        phone: "0509739955"
    },
    {
        id: 2,
        name: "Mauno",
        phone: "0509889957"
    }
]

//GET ALL
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/info', (req, res) => {
    res.send('<h2>info</h2>')
})

//GET 1 PERSON
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})
//GENERATE ADD FOR ADDING NEW PERSON
const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(p => p.id))
        : 0
    return maxId + 5
}

//ADD NEW PERSON
app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.name || !body.phone) {
        return response.status(400).json({
            error: 'name or number or both are missing'
        })
    }
    const newPerson = {
        name: body.name,
        phone: body.phone,
        id: generateId()
    }
    persons = persons.concat(newPerson)
    response.json(newPerson)
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)