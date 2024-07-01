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

  /*
    alquilar = async (id) => {
        try {
            // Llamar al servicio externo para verificar el premio
            const premioResponse = await fetch('https://libros.deno.dev/premios');
            const premioData = await premioResponse.json();
    
            if (premioData.premio) {
                // Si el premio fue otorgado, dar de baja automáticamente el libro
                const libroDadoDeBaja = await this.model.baja(id);
                return { mensaje: '¡Felicidades! Ha ganado el sorteo.', libro: libroDadoDeBaja };
            }
    
            // Si no se ganó el premio, proceder con el alquiler del libro
            const libroAlquilado = await this.model.alquilar(id);
            return libroAlquilado;
    
        } catch (error) {
            console.error('Error al alquilar el libro:', error);
            throw new Error('Error interno al verificar el premio.');
        }
    };
    

    alquilar = async (id) => {
        try {
            // Llamar al servicio externo para verificar el premio
            const response = await axios.get('https://libros.deno.dev/premios');
            const premioData = response.data;
    
            if (premioData.premio) {
                // Si el premio fue otorgado, dar de baja automáticamente el libro
                const libroDadoDeBaja = await this.model.baja(id);
                return { mensaje: '¡Felicidades! Ha ganado el sorteo.', libro: libroDadoDeBaja };
            }
    
            // Si no se ganó el premio, proceder con el alquiler del libro
            const libroAlquilado = await this.model.alquilar(id);
            return libroAlquilado;
    
        } catch (error) {
            console.error('Error al alquilar el libro:', error);
            throw new Error('Error interno al verificar el premio.');
        }
    };

*/



    devolver = async (id) => {
        const libro = await this.model.devolver(id)
        return libro;
    }

    noApto = async (id) => {
        const libro = await this.model.noApto(id)
        return libro;
    }
    
    obtenerLibro = async (id) => {
        const libro = await this.model.obtenerLibro(id)
        return libro;
    }

    obtenerLibros = async () => {
        const libros = await this.model.obtenerLibros()
        return libros
    }

}

export default Servicio