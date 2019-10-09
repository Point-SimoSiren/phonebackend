require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const Person = require('./models/person')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(morgan('tiny'))
/*Täydensin morganin logausta omalla ajastetulla console.logilla
kun en saanut tehtyä morganiin edistyneempää custom configurointia.*/



//GET ALL etsitään kaikki modelin Person ilmentymät.
app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons.map(note => note.toJSON()))
    })
})

//GET INFO
app.get('/api/info', (req, res) => {
    res.send(`<p>numberbook has info for ${persons.length} people<br> ${new Date()} <p>`)
})

//GET 1 PERSON
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id) //Number ei viittaa puh numeroon, vaan on funktio jossa id muutetaan numeraaliseksi arvoksi vastaamaan person.id:tä
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
        setTimeout(function () {
            console.log(person)
        }, 200)
    } else {
        response.status(404).end()
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

    if (!body.name || !body.number) {
        setTimeout(function () {
            console.log('name or number are missing')
        }, 200)
        return response.status(400).json({
            error: 'name or number are missing'
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
            number: body.number,
            id: generateId()
        }
        setTimeout(function () {
            console.log('Added person :', newPerson)
        }, 200)
        persons = persons.concat(newPerson)
        response.json(newPerson)
    }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})