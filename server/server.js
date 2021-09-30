const express = require('express')
require('dotenv').config()

const PORT = process.env.PORT || 5000
const app = express()

app.get('/api', (req, res) => {
    res.send({message: "Hello world"})
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))