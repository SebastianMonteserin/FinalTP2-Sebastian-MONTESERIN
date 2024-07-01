import fs from 'fs'



// el agrego de fecha y hora se hacen en esta capa atento de que alguno motores de BD pueden tener metodos propios que lo 
// permiten hacer y aqui se invocarían.

class ModelFile {
    constructor() {
        this.nombreArchivo = 'sondas.json'

    }

    leerArchivo = async nombre => {
        let sondas = []
        try {
            sondas = JSON.parse(await fs.promises.readFile(nombre, 'utf-8'))
        }
        catch { }

        return sondas
    }

    escribirArchivo = async (nombre, sondas) => {
        await fs.promises.writeFile(nombre, JSON.stringify(sondas, null, '\t'))
    }

    ingresar = async sonda => {
        const sondas = await this.leerArchivo(this.nombreArchivo)
        const ahora = new Date();
        const fechaHoraLocal = ahora.toLocaleString('es-ES', { 
            dateStyle: 'short', 
            timeStyle: 'medium' 
        });
        sonda.recepcion = fechaHoraLocal
        sondas.push(sonda)
        await this.escribirArchivo(this.nombreArchivo, sondas)
        return sonda
    }

    listarDatos = async () => {
        try {
            const sondas = await this.leerArchivo(this.nombreArchivo)
            return sondas
        }

        catch {
            return id ? {} : []
        }
    }

    listarDatosPorSonda = async (id) => {
        const sondas = await this.leerArchivo(this.nombreArchivo);
        const sondasFiltradas = sondas.filter(sonda => sonda.id === id);
    
        if (sondasFiltradas.length > 0) {
            return sondasFiltradas;
        } else {
            return { errorMsg: 'El ID de la sonda no existe.' };
        }
    }
    
    

}

export default ModelFile