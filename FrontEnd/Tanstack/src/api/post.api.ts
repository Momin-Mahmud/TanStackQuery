import axios from "axios";

const endPoint = "https://localhost:7002/api";

export const getPosts = async () => {
    debugger
    const response = await axios.get(`${endPoint}/Post`);
    return response;
}

export const createPost = async (data: any) => {
    const response = await axios.post(`${endPoint}/Post`, data);
    return response;
}