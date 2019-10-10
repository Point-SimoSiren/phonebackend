const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

//Scheman eli konstruktorin luonti
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 20,
        required: true
    },
    number: {
        type: String,
        minlength: 5,
        maxlength: 15,
        required: true
    }
})
//Muotoillaan kannasta haettavien olioiden toJSON -metodin asetuksia:
//Poistetaan oliomuotoinen id ja versiomerkintä metodin tuotoksesta.
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
//Modelin luonti edellä luotua schemaa hyödyntäen
const Person = mongoose.model('Person', personSchema)

module.exports = mongoose.model('Person', personSchema)