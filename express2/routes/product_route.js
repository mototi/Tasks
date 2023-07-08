import express from 'express'

import {postProduct ,putProduct , getProducts , getById , deleteItem} from '../controller/productController.js'
import {validateProduct_Post , validateProduct_Put} from '../services/product_services.js'
import {verifiction} from '../services/usersServices.js'


export const productRouter  = express.Router();


productRouter.post("/products" , [verifiction,validateProduct_Post,postProduct])

productRouter.put("/products/:id([0-9]+)" ,[verifiction ,validateProduct_Put , putProduct] )

productRouter.get("/products" , getProducts) 

productRouter.get("/products/:id([0-9]+)" , getById) 

productRouter.delete("/products/:id([0-9]+)" , deleteItem) 


