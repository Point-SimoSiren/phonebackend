const express = require('express')
const app = express()

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

app.get('/notes', (req, res) => {
    res.json(persons)
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)