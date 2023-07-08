import express from 'express' 

import {validregister , validlogin , verifiction} from '../services/usersServices.js'
import {createNewUser , loginUser , creatNewCategory , UpdateCategory ,getCategories ,getCatById } from '../controller/usersController.js'
import {validCategory } from '../services/category.Services.js'

export const userRouter = express.Router();

userRouter.post("/register" , [validregister , createNewUser])

userRouter.post("/login" , [validlogin , loginUser])

userRouter.post("/category" , [verifiction ,validCategory , creatNewCategory]);

userRouter.put("/category/:id([0-9]+)" ,[verifiction ,validCategory , UpdateCategory ])

userRouter.get("/category" , getCategories)

userRouter.get( "/category/:id([0-9]+)" , getCatById)