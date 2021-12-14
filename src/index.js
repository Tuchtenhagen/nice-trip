

import express from 'express'
import bodyParser from 'body-parser'
import router from './routes/index.js'
import { PORT } from './config.js'

const app = express()

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

app.use('/', router)
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: false }));


app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
})
