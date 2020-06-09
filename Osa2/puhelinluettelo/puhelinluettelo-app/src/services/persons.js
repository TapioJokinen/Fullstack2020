import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(res => res.data)
}

const create = (nameObject) => {
    const request = axios.post(baseUrl, nameObject)
    return request.then(res => res.data)
}

const update = (id, nameObject) => {
    const request = axios.put(`${baseUrl}/${id}`, nameObject)
    return request.then(res => res.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(res => console.log(res))
}

export default { getAll, create, update, deletePerson }