const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/produtos', db.getProdutos)
app.get('/produtos/:id', db.getProdutoById)
app.post('/produtos', db.createProduto)
app.put('/produtos/:id', db.updateProduto)
app.delete('/produtos/:id', db.deleteProduto)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})