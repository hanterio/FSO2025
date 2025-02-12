import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons/'

const getAll = () => {
    const request = axios.get(baseUrl) 
    return request.then(response => response.data)
}

const lisays = uusiNimi => {
    return axios.post(baseUrl, uusiNimi)
}

const poisto = id => {
    return axios.delete(`${baseUrl}${id}`)
}

export default {getAll, lisays, poisto}