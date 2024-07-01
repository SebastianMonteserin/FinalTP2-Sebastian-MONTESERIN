import express from 'express'
import Controlador from '../controlador/sondas.js'


class Router {
    constructor() {
        this.router = express.Router()
        this.controlador = new Controlador()
    }

    start() {
        this.router.post('/ingresar', this.controlador.ingresar)
        this.router.get('/listarDatos', this.controlador.listarDatos)
        this.router.get('/listarDatos/:id', this.controlador.listarDatosPorSonda)
        this.router.get('/obtenerEstadisticas', this.controlador.obtenerEstadisticas)      
         return this.router
    }
}

export default Router

