import Servicio from '../servicio/libros.js'


class Controlador {
        constructor() {
                this.servicio = new Servicio()
        }

        alta = async (req, res) => {
                try {
                        const libro = req.body
                        const libroGuardado = await this.servicio.alta(libro)
                        if (libroGuardado.errorMsg) {
                                return res.status(401).json(libroGuardado)
                        }
                        res.status(200).json(libroGuardado)
                }
                catch (error) {
                        res.status(500).json({ error: error.message })
                }
        }

        baja = async (req, res) => {
                try {
                        const libro = req.body
                        const libroEliminado = await this.servicio.baja(libro)
                        res.status(200).json(libroEliminado)
                }
                catch (error) {
                        res.status(500).json({ error: error.message })
                }
        }

        alquilar = async (req, res) => {
                try {
                        const { id: codigo } = req.params;
                        const id = parseInt(codigo, 10);
                        const libro = await this.servicio.alquilar(id)
                        if (libro.errorMsg) {
                                return res.status(409).json(libro)
                        }
                        res.status(200).json(libro)
                }
                catch (error) {
                        res.status(500).json({ error: error.message })
                }

        }

        devolver = async (req, res) => {
                try {
                        const { id: codigo } = req.params;
                        const id = parseInt(codigo, 10);
                        const libro = await this.servicio.devolver(id)
                        if (libro.errorMsg) {
                                return res.status(401).json(libro)
                        }
                        res.status(200).json(libro)
                }
                catch (error) {
                        res.status(500).json({ error: error.message })
                }

        }

        noApto = async (req, res) => {
                try {

                        const { id: codigo } = req.params;
                        const id = parseInt(codigo, 10);
                        const libro = await this.servicio.noApto(id)
                        res.status(401).json(libro)
                }
                catch (error) {
                        res.status(500).json({ error: error.message })
                }

        }

        obtenerLibros = async (req, res) => {
                try {
                        const libros = await this.servicio.obtenerLibros()
                        res.status(401).json(libros)
                }
                catch (error) {
                        res.status(500).json({ error: error.message })
                }
        }



}
export default Controlador
