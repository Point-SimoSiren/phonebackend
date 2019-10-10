/* Tämän tiedoston avulla saa konsolikomennolla 'node mongo.js mongoAtlasKäyttäjäSalasana',
Haettua kannasta kaikki muistiinpanot konsoliin.
Jos antaa lisäparametrina kaksi erillistä merkkijonoa, ne
talletetaan kantaan uutena kontaktina ja palautetaan konsolille
lisätty nimi ja numero.*/

const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://sirensimo7:${password}@simozon-e2242.mongodb.net/persons-app?retryWrites=true`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 4) {
    console.log('phonebook: ')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}
else {

    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(result => {
        console.log('Added ', result.name, result.number, ' to phonebook')
        mongoose.connection.close()
    })
}