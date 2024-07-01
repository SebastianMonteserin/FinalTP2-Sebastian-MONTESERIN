import axios from "axios"


const pruebaServidorConAxios = async () => {
    const url = 'http://localhost:8080/listarDatos'

    try {
        const {data:body, status} = await axios(url)
        console.log('status code', status)
        console.log('body', body)
    }
    catch(error) {
        console.log('error', error.message)
    }
}

pruebaServidorConAxios()