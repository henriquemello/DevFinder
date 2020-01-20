const express = require('express')
const mongoose = require('mongoose')
const routes = require('./router')

const app = express();

mongoose.connect('mongodb://localhost/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json())
app.use(routes)

app.listen(3333)