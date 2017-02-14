import axios from 'axios'

const defaults = {
    baseURL: (process.env.NODE_ENV === 'production') ? 'http://192.168.238.24:9000/front' : 'http://192.168.238.24:9000/front'
}

Object.assign(axios.defaults, defaults)

export const fetchTags = (platform, category) => {
    return axios.get(`/tags/${platform}/${category}`)
}

export const fetchCases = (conditions) => {
    return axios.get(`/articles/`, {params: conditions})
}

export const fetchCaseDetail = (id) => {
    return axios.get(`/articles/${id}`)
}

export const fetchTagDetail = (id) => {
    return axios.get(`/tags/${id}`)
}
