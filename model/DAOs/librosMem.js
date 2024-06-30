class ModelMem {
    constructor() {
        this.numeros = [
        
        ]
    }

    guardarNumero = async numero => {
        numero.numero = Number(numero.numero)
        this.numeros.push(numero)
        return numero
    }


    obtenerNumeros = async () => {    
            return this.numeros
        }
    



}

export default ModelMem