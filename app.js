const express = require('express')
const config = require('./config')

const app = express()

app.set('port', config.port)

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/api', require('./src/routes/product'))

module.exports = app