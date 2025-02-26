import axios from 'axios'

const baseUrl = '/api/persons/'

const getAll = () => {
    const request = axios.get(baseUrl) 
    return request.then(response => response.data)
}

const lisays = uusiNimi => {
    return axios.post(baseUrl, uusiNimi)
}

const korvaus = muutettuNumero => {
    return axios.put(`${baseUrl}${muutettuNumero.id}`, muutettuNumero)
}

const poisto = id => {
    return axios.delete(`${baseUrl}${id}`)
}

export default {getAll, lisays, poisto, korvaus}