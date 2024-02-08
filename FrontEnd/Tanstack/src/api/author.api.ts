import axios from "axios";
const endPoint = 'https://localhost:7002/api'


export const getAuthors = async () => {
    const response = await axios.get(`${endPoint}/Author`)
    console.log(response.data)
    return response
}

export const createAuthor = async (data: any) => {
    const response = await axios.post(`${endPoint}/Author`, data)
    console.log(response.data)
    return response
}

export const getAuthorPosts = async (id: any) => {
    const response = await axios.get(`${endPoint}/Author/${id}/posts`)
    console.log(response.data)
    return response
}