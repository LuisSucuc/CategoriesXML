import { CategoryRequest } from '../api/CategoryAPI'

export const sendFile = (file) => {
    const formData = new FormData();
    formData.append('File', file);
    return CategoryRequest.post('process_file/', formData);
}


export const getCategories = (page=1) => {
    return CategoryRequest.get(`category/?page=${page}`);
}


export const createCategory = (payload) => {
    return CategoryRequest.post(`category/`, payload);
}