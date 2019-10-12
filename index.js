require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const Person = require('./models/person')

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())

app.use(morgan('tiny'))

//GET INFO
app.get('/api/info', (req, res) => {
    Person.find({}).then(persons => {
        res.send(`<p style="font-size: 25">Phonebook has info for ${persons.length} people <br>
        ${new Date()}</p>`)
    })
})


//GET ALL etsitään kaikki modelin Person ilmentymät.
app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons.map(person => person.toJSON()))
    })
})


//GET 1 PERSON
app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person.toJSON())
            } else {
                //Jos tulee null arvo, eli id:tä ei löydy.
                response.status(404).end()
            }
        })
        .catch(error => next(error))

    //response.status(400).send({ error: 'malformatted id' })
})


//DELETE PERSON BY ID
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            console.log('Deleted: ', result)
            response.status(204).end()
        })
        .catch(error => next(error))
})


//ADD NEW PERSON
app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save()
        .then(savedPerson => savedPerson.toJSON())
        .then(savedJsonPerson => {
            response.json(savedJsonPerson)
            console.log(savedJsonPerson)
        })
        .catch(error => next(error))
})


//UPDATE PERSON 
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})


// Olemattomien osoitteiden käsittely
const unknownEndpoint = (request, response, next) => {
    response.status(404).send({ error: 'unknown endpoint. Remove all extra characters from the address above after herokuapp.com' })
}
app.use(unknownEndpoint)


// ERROR KÄSITTELIJÄ MIDDLEWARE
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })

    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}

app.use(errorHandler)


//PORT SETUP
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
