import {getAllProducts,
    getProductById,
    postProduct,
    deleteProductById,
    UpdateProductById} from '../model/products.js' ; 
    
    
    export const getAll = (req , res) => {
        getAllProducts().then( response => {
            res.status(200).send(response.data)
        }).catch ( error => {
            if (error.response) {
                res.status(500);
            } else if (error.request) {
                res.status(400);
            } else {
                res.send(error.message);
            }
        })
    }
    
    export const getById = (req , res) => {
        getProductById(req.params.id).then( response =>{
            res.status(200).send(response.data);
        }).catch( error => {
            if (error.response) {
                res.status(404).send("product not found");
            } else if (error.request) {
                res.status(400);
            } else {
                res.send("not found");
            }
        })
    }
    
    export const create = (req , res) => {
        postProduct(req.body).then( response => {
            res.status(201).send(response.data)
        }).catch( error => {
            if (error.response) {
                res.status(500);
            } else if (error.request) {
                res.status(400);
            } else {
                res.send(error.message);
            }
            res.end();
        })
    }

    export const alter = (req , res) => {
        UpdateProductById(req.params.id , req.body).then( response =>{
        res.status(200).send(response.data);
        }).catch( error => {
            res.status(400).send("product not found");
        })
    }

    export const deleteProduct = (req,res) => {
        deleteProductById(req.params.id).then( response => {
            res.send("Deleted")
        }).catch( error => {
            res.status(404).send("product not found")
        })  
    }