import express from 'express' 
import {getAll , getById , create} from './controller/productsController.js'
import {validate} from './services/productsServices.js'


import {getAllProducts,
    getProductById,
    postProduct,
    deleteProductById,
    UpdateProductById} from './model/products.js' ; 


    
const app = express();
app.use(express.json());

app.get("/products/:id([0-9]+)" , getById)

app.get("/products" , getAll) 

//pp.post("/products" , create)

app.post("/products" , [validate , create])

app.listen(8080 , () => console.log("server on http://localhost:8080"));