import {register , getUser} from '../model/users.js'
import jwt from 'jsonwebtoken'
import {createHash} from 'crypto'
import dotenv from 'dotenv'
import {creatCategory ,putCategory ,getall ,getById} from '../model/categories.js'


dotenv.config()



export const createNewUser = (req , res) => {
    const {email , password} = req.body;
    const hashed_pass = createHash('sha256').update(password , 'utf-8').digest('hex')
    try {
        register( {email: email , password : hashed_pass} );
        return res.status(201).json( {"success": true} )
    } catch (error) {
        return res.status(500).send( {"success": false} )
    }
}


export const loginUser = (req,res) => {
    const {email , password} = req.body;
    const hashed_pass = createHash('sha256').update(password , 'utf-8').digest('hex')
    const user = getUser({email , hashed_pass})
    if(!user){
        return res.status(401).json({ status : "error" , meesage : "Unauthenticated"});
    }
    const token = jwt.sign(user , process.env.JWT_PASS )
    return res.status(200).json({...user , token})
}


export const creatNewCategory = (req,res) => {
    try {
        const cat = creatCategory(req.body)
        return res.status(201).json(cat)
    } catch (error) {
        return res.status(500).send( {"success": false} )
    }

}


export const UpdateCategory = (req,res) => {
    const name = req.body ; 
    const category_id = req.params.id ;
    const obj = name ;
    obj["category_id"] = category_id;
    try {
        const result = putCategory(obj);
        if(!result){ return res.status(404).send("there is no category with this id")}
        return res.status(200).json(obj)
    } catch (error) {
        return res.status(500).send("server error")
    }
}

export const getCategories = ( req , res) => {
    try {
        return res.status(200).json(getall());
    } catch (error) {
        return res.status(500).send("server error")
    }
}

export const getCatById = ( req , res) => {
    try {
        const result = getById(req.params.id);
        if(!result) {res.status(404).send("no category with that id")}
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).send("server error")
    }
}







