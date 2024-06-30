import fs from 'fs'
import EstadoLibro from '../../entities/Estado.js';


// las busquedas y actualziaciones se hacen en esta capa atento de que alguno motores de BD tienen metodos propios que lo permiten hacer y aqui se invocarían
class ModelFile {
    constructor() {
        this.nombreArchivo = 'libros.json'

    }

    leerArchivo = async nombre => {
        let libros = []
        try {
            libros = JSON.parse(await fs.promises.readFile(nombre, 'utf-8'))
        }
        catch { }

        return libros
    }

    escribirArchivo = async (nombre, libros) => {
        await fs.promises.writeFile(nombre, JSON.stringify(libros, null, '\t'))
    }

    alta = async libro => {
        const libros = await this.leerArchivo(this.nombreArchivo)
        libros.push(libro)
        await this.escribirArchivo(this.nombreArchivo, libros)
        return libro
    }

    baja = async libro => {
        const libros = await this.leerArchivo(this.nombreArchivo)
        const index = libros.findIndex(l => l.codigo === libro.codigo);

        if (index === -1) {
            return { message: 'El libro no existe.' };

        } else {
            libros.splice(index, 1);
            await this.escribirArchivo(this.nombreArchivo, libros);
            return libro;

        }
    }

    alquilar = async (id) => {
        const libros = await this.leerArchivo(this.nombreArchivo);
        const index = libros.findIndex(libro => libro.codigo === id);

        if (index !== -1) {
            const libroAnterior = libros[index];

            if (libroAnterior.estado === EstadoLibro.NO_APTO || libroAnterior.estado === EstadoLibro.ALQUILADO) {
                return { errorMsg: 'El libro no está apto para ser alquilado.' }
            } else {
                libroAnterior.estado = EstadoLibro.ALQUILADO
                await this.escribirArchivo(this.nombreArchivo, libros)
                return libroAnterior;
            }
        } else {
            return { errorMsg: 'El ID del libro no existe.' };
        }
    }

    obtenerLibro = async (id) => {
        const libros = await this.leerArchivo(this.nombreArchivo);
        const index = libros.findIndex(libro => libro.codigo === id);

        if (index !== -1) {
            const libro = libros[index];
            return libro
        } else {
            return { errorMsg: 'El ID del libro no existe.' };
        }

    }

    devolver = async id => {
        const libros = await this.leerArchivo(this.nombreArchivo);
        const index = libros.findIndex(libro => libro.codigo === id);
        if (index !== -1) {
            const libro = libros[index];
            libro.estado = EstadoLibro.DISPONIBLE
            await this.escribirArchivo(this.nombreArchivo, libros)
            return libro
        } else {
            return { errorMsg: 'El ID del libro no existe.' };
        }
    }

    noApto = async id => {
        const libros = await this.leerArchivo(this.nombreArchivo)
        const index = libros.findIndex(libro => libro.codigo === id);
        if (index != -1) {
            const libro = libros[index]
            libro.estado = 'no-apto'
            await this.escribirArchivo(this.nombreArchivo, libros)
            return libro;
        }
        else {
            return { errorMsg: 'El id no existe.' };
        }

    }


    obtenerLibros = async () => {
        try {
            const libros = await this.leerArchivo(this.nombreArchivo)
            return libros
        }

        catch {
            return id ? {} : []
        }
    }


}

export default ModelFile