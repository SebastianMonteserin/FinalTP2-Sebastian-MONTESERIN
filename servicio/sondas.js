import ModelFactory from '../model/DAOs/sondasFactory.js'
import { validar } from "./validaciones/sondas.js"
import axios from 'axios';

class Servicio {
    constructor() {
        this.model = ModelFactory.get('FILE')

    }

    ingresar = async sonda => {
        const res = validar(sonda);
        if (res.result) {
            const sondaGuardado = await this.model.ingresar(sonda)
            return sondaGuardado;
        } else {
            return { errorMsg: "datos no válidos" };
        }
    };

    listarDatos = async () => {
        const sondas = await this.model.listarDatos()
        return sondas
    }

    listarDatosPorSonda = async (id) => {
        const sonda = await this.model.listarDatosPorSonda(id)
        return sonda;
    }

    obtenerEstadisticas = async () => {
        const sondas = await this.listarDatos();

        const estadisticas = {
            cantidadTotalMuestras: 0,
            temperaturaSondas: {}
        };

        sondas.forEach(sonda => {
            const { id, temperatura } = sonda;

            if (!estadisticas.temperaturaSondas[id]) {
                estadisticas.temperaturaSondas[id] = { cantidad: 0, sumaTemperatura: 0 };
            }

            estadisticas.temperaturaSondas[id].cantidad += 1;
            estadisticas.temperaturaSondas[id].sumaTemperatura += temperatura;
            estadisticas.cantidadTotalMuestras += 1;
        });

        for (const id in estadisticas.temperaturaSondas) {
            const sonda = estadisticas.temperaturaSondas[id];
            sonda.promedio = sonda.sumaTemperatura / sonda.cantidad;
            delete sonda.sumaTemperatura;
        }

        return { estadisticas };
    }


}

export default Servicio