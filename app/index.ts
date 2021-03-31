import express from 'express'
import config from 'config'
import cors from 'cors'
import bodyParser from 'body-parser'
import Response from './services/Response'
import { httpError } from './helpers/http'
import axios from 'axios'

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('API')
})


app.use((req, res, next) =>
  httpError('Resource not found.', Response.NOT_FOUND, res),
)

app.listen(config.get('server.port'), () => {
  console.log(`Server started at http://localhost:${config.get('server.port')}`)
})
