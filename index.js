const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))
/*Täydensin morganin logausta omalla 200ms ajastetulla console.logilla
kun en saanut tehtyä morganin edistynyttä custom configurointia.
Laitoin erroreihin lisäksi sopivia värejä.*/

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

//GET INFO
app.get('/api/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people<br> ${new Date()} <p>`)
})

//GET 1 PERSON
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
        setTimeout(function () {
            console.log(person)
        }, 200)
    } else {
        response.status(404).body('Didn´t find that person ID')
    }
})

//DELETE PERSON BY ID
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

//GENERATE ID FOR ADDING NEW PERSON
const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(p => p.id))
        : 0
    return maxId + 5
}

//ADD NEW PERSON
app.post('/api/persons', (request, response) => {
    const body = request.body
    const existingPerson = persons.find(person => person.name === body.name)

    if (!body.name || !body.phone) {
        setTimeout(function () {
            console.log('name or phone are missing')
        }, 200)
        return response.status(400).json({
            error: 'name or phone are missing'
        })
    }
    else if (existingPerson) {
        setTimeout(function () {
            console.log('\x1b[33m%s\x1b[0m', 'Name already exists on database')
        }, 200)
        return response.status(405).json({
            error: 'name already exists'
        })
    }
    else {
        const newPerson = {
            name: body.name,
            phone: body.phone,
            id: generateId()
        }
        setTimeout(function () {
            console.log('Added person :', newPerson)
        }, 200)
        persons = persons.concat(newPerson)
        response.json(newPerson)
    }
})

const port = process.env.PORT || 3001
app.listen(port)
console.log(`Server running on port ${port}`)