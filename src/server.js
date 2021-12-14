import express from 'express'

const app = express()
const routes = express.Router()

app.use(express.json())

app.use(routes)

// routes.get('/guides', (req, res) => { res.send({teste: "Oi mundo!"})})

export default app

