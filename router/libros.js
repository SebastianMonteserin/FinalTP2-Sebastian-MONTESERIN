import express from 'express'
import Controlador from '../controlador/libros.js'


class Router {
    constructor() {
        this.router = express.Router()
        this.controlador = new Controlador()
    }

    start() {
        this.router.post('/alta', this.controlador.alta)
        this.router.delete('/baja', this.controlador.baja)
        this.router.put('/alquilar/:id', this.controlador.alquilar)
        this.router.put('/devolver/:id', this.controlador.devolver)
        this.router.put('/noApto/:id', this.controlador.noApto)
        this.router.get('/obtenerLibros', this.controlador.obtenerLibros)
        return this.router
    }
}

export default Router

