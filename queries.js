const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'postgres',
    password: 'test',
    port: 5432,
})

const getProdutos = (request, response) => {
    pool.query('SELECT * FROM produtos ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getProdutoById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM produtos WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createProduto = (request, response) => {
    const { nome, preco, qtd_atual, qtd_min, custo } = request.body
    
    const { v1: uuidv1 } = require('uuid')

    pool.query('INSERT INTO produtos (nome, preco, qtd_atual, qtd_min, custo, id) VALUES ($1, $2, $3, $4, $5, $6)', [nome, preco, qtd_atual, qtd_min, custo, uuidv1()], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Produto adicionado`)
    })
}

const updateProduto = (request, response) => {
    const id = parseInt(request.params.id)
    const { nome, preco, qtd_atual, qtd_min, custo } = request.body

    pool.query(
        'UPDATE produtos SET nome = $1, preco = $2, qtd_atual = $3, qtd_min = $4, custo = $5 WHERE id = $6',
        [nome, preco, qtd_atual, qtd_min, custo, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Produto modificado com o ID: ${id}`)
        }
    )
}

const deleteProduto = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM produtos WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Produto deletado com ID: ${id}`)
    })
}

module.exports = {
    getProdutos,
    getProdutoById,
    createProduto,
    updateProduto,
    deleteProduto,
}