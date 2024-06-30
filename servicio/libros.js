//import ModelMem from '../model/DAOs/librosMem.js'
import ModelFile from '../model/DAOs/librosFile.js'
import EstadoLibro from '../entities/Estado.js'
import {validar} from "./validaciones/libros.js"


class Servicio {
    constructor() {
        //  this.model = new ModelMem()
        this.model = new ModelFile()

    }

    alta = async libro => {
        const res = validar(libro);
        if (res.result) {
            libro.estado = EstadoLibro.DISPONIBLE
            const libroGuardado = await this.model.alta(libro)
            return libroGuardado;
        } else {
            return { errorMsg: res.error };
        }
    };



    baja = async (libro) => {
        const libroEliminado = await this.model.baja(libro)
        return libroEliminado;
    }


    alquilar = async (id) => {
        const libro = await this.model.alquilar(id)
        return libro;
    }

    devolver = async (id) => {
        const libro = await this.model.devolver(id)
        return libro;
    }

    noApto = async (id) => {
        const libro = await this.model.noApto(id)
        return libro;
    }


    obtenerLibros = async () => {
        const libros = await this.model.obtenerLibros()
        return libros
    }

}

export default Servicio