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
        res.json(persons.map(person => person.toJSON()))
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
/* const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(p => p.id))
        : 0
    return maxId + 5
} */


//ADD NEW PERSON
app.post('/api/persons', (request, response) => {
    const body = request.body
    if (body.name === undefined || body.number === undefined) {
        return response.status(400).json({ error: 'name or number is missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save().then(savedPerson => {
        response.json(savedPerson.toJSON())
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})