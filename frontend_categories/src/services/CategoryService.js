import { CategoryRequest } from '../api/CategoryAPI'

export const sendFile = (file) => {
    const formData = new FormData();
    formData.append('File', file);
    return CategoryRequest.post(`process_file/`, formData);
}