import Servicio from '../servicio/sondas.js'


class Controlador {
        constructor() {
                this.servicio = new Servicio()
        }

        ingresar = async (req, res) => {
                try {
                        const sonda = req.body
                        const sondaGuardada = await this.servicio.ingresar(sonda)
                        if (sondaGuardada.errorMsg) {
                                return res.status(404).json(sondaGuardada)
                        }
                        res.status(200).json(sondaGuardada)
                }
                catch (error) {
                        res.status(500).json({ error: error.message })
                }
        }

        listarDatos = async (req, res) => {
                try {
                        const sondas = await this.servicio.listarDatos()
                        res.status(404).json(sondas)
                }
                catch (error) {
                        res.status(500).json({ error: error.message })
                }
        }

        listarDatosPorSonda = async (req, res) => {
                try {
                        let { id } = req.params;
                         id = parseInt(id, 10);
                        const sonda = await this.servicio.listarDatosPorSonda(id)
                        if (sonda.errorMsg) {
                                return res.status(404).json(sonda)
                        }
                        res.status(200).json(sonda)
                } catch (error) {
                        res.status(500).json({ error: error.message })
                }
        }

        obtenerEstadisticas = async (req, res) => {
                try {
                        const sondas = await this.servicio.obtenerEstadisticas()
                        res.status(200).json(sondas)
                }
                catch (error) {
                        res.status(500).json({ error: error.message })
                }
        }



}
export default Controlador
