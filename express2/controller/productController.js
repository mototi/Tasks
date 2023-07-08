import {createProduct ,updateProduct , getall , getId , deleteid} from '../model/product.js'


export const postProduct = (req , res ) => {
    try {
        const result = createProduct(req.body);
        if(!result) { return res.status(404).send("no category with that id")}
        return res.status(201).json(result)
    } catch (error) {
        return res.status(500).send("server error")
    }
}

export const putProduct = (req,res) =>{
    try {
        const obj = req.body;
        const id = req.params.id;
        obj["id"] = id ;
        const result = updateProduct(obj);
        if(!result) {return res.status(404).send("product not found with that id")}
        if(result==-1){{return res.status(404).send("canot change that category cuz its not insiated yet")}}
        return res.status(200).json(obj);
        
    } catch (error) {
        return res.status(500).send("server error")
    }
}

export const getProducts = (req,res) =>{
    try {
        return res.status(200).json(getall())
    } catch (error) {
        return res.status(500).send("sever error")
    }
}


export const getById = ( req , res ) => {
    try {
        const result = getId (req.params.id)
        if(!result){return res.status(404).send("product not found")}
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).send("server error")
    }
}


export const deleteItem = (req , res) => {
    try {
        const result = deleteid(req.params.id)
        if(!result){return res.status(404).send("product not found")}
        res.status(200).json(result)
    } catch (error) {
        res.status(500).send("server error")
    }
}