import express from 'express'

import {getAll , getById , create, alter , deleteProduct} from '../controller/productsController.js'
import {validatePost} from '../services/productsServices.js'


export const Router  = express.Router();


Router.get("/products/:id([0-9]+)" , getById)

Router.get("/products" , getAll) 

Router.post("/products" , [validatePost , create])

Router.put( "/products/:id([0-9]+)" , alter )

Router.delete ("/products/:id([0-9]+)" , deleteProduct)

