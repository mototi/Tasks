import express from 'express'

import {getAll , getById , create, alter , deleteProduct} from '../controller/productsController.js'
import {validatePost , validatePut} from '../services/productsServices.js'


export const Router  = express.Router();


Router.get("/testproducts/:id([0-9]+)" , getById)

Router.get("/testproducts" , getAll) 

Router.post("/testproducts" , [validatePost , create])

Router.put( "/testproducts/:id([0-9]+)" , [validatePut , alter] )

Router.delete ("/testproducts/:id([0-9]+)" , deleteProduct)

