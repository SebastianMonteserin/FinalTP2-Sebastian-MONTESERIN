import express from 'express'
import RouterSondas from './router/sondas.js'
import 'dotenv/config'
import config from './config.js'


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static('public'))


app.use('/', new RouterSondas().start())


const PORT = config.PORT
const server = app.listen(process.env.PORT, () => console.log(`Servidor express escuchando en http://localhost:${PORT}`))
server.on('error', error => console.log(`Error en servidor: ${error.message}`))
