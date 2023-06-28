import axios from 'axios'


export const getAllProducts = async () => {
   const products = await axios.get("https://api.escuelajs.co/api/v1/products");
   return products;
}


export const getProductById = async (id) => {
    const products = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
    return products;
 }

export const postProduct = async (obj) => {
    const products = await axios.post(`https://api.escuelajs.co/api/v1/products/` , obj);
    return products;
 }

export const UpdateProductById = async (id , obj) => {
    const products = await axios.put(`https://api.escuelajs.co/api/v1/products/${id}` , obj);
    return products;
 }

export  const deleteProductById = async (id) => {
    const products = await axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`);
    return products;
 }


 
