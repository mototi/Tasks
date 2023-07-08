import {getAllProducts,
    getProductById,
    postProduct,
    deleteProductById,
    UpdateProductById} from '../model/products.js' ; 
    
    
    export const getAll = (req , res) => {
        const result = getAllProducts() ;
        if( !result ){
            return res.status(500).send("server error")
        }
        return res.status(200).json( result )
    }
    
    export const getById = (req , res) => {
        const result = getProductById(req.params.id);
        if ( !result ){
            return res.status(404).send("product not found")
        }
        return res.status(200).json( result )
    }
    
    export const create = (req , res) => {
        const result = postProduct(req.body);
        if ( !result ){
            return res.status(500).send("server error")
        }
        return res.status(201).json(result)
    }

    export const alter = (req , res) => {
        const result = UpdateProductById(req.params.id , req.body);
        if( !result ){
            return res.status(400).send("product not found");
        }
        return res.status(200).json(result);
    }

    export const deleteProduct = (req,res) => {
        
        const result = deleteProductById(req.params.id);
        console.log("ctrl i :" + result);
        if( !result ){
           return res.status(404).send("product not found")
        }
        return res.status(200).send("product deleted successfully")
    }