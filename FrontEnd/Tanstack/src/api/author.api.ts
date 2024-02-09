import axios from "axios";
const endPoint = 'https://localhost:7002/api'


export const getAuthors = async () => {
    const response = await axios.get(`${endPoint}/Author`)
    return response
}

export const createAuthor = async (data: any) => {
    const response = await axios.post(`${endPoint}/Author`, data)
    return response
}

export const getAuthorPosts = async (id: any) => {
    const response = await axios.get(`${endPoint}/Author/${id}/posts`)
    return response
}

export const updateAuthor : any = async (id: any, data: any) => {
    const response = await axios.put(`${endPoint}/Author/${id}`, data)
    return response
}

export const deleteAuthor = async (id: any) => {
    const response = await axios.delete(`${endPoint}/Author/${id}`)
    return response
}