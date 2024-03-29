import axios from "axios";

interface GetPostsPaginatedParams {
    pageParam: number;
}

const endPoint = "https://localhost:7002/api";

export const getPosts = async () => {
    const response = await axios.get(`${endPoint}/Post`);
    return response;
}

export const createPost = async (data: any) => {
    const response = await axios.post(`${endPoint}/Post`, data);
    return response;
}

export const getPost = async (id: any) => {
    const response = await axios.get(`${endPoint}/Post/${id}`);
    return response;
}

export const getPostAuthor = async (id: any) => {
    const response = await axios.get(`${endPoint}/Post/${id}/author`);
    return response;
}

export const getPostsPaginated = async ({ pageParam }:any) => {
    const response = await axios.get(`${endPoint}/Post/paginated?page=${pageParam}`);
    return response;
}
