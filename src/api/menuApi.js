import axios from "axios";

const API = "https://paris-backend-1q8j.onrender.com/api/menuItems";

export const getMenu = ()=> axios.get(API);
export const addMenu = (data)=> axios.post(API,data);
export const deleteMenu = (id)=> axios.delete(`${API}/${id}`);
export const updateMenu = (id,data)=> axios.put(`${API}/${id}`,data);