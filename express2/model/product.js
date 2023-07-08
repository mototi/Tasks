import{categories} from './categories.js'

const product = [];

let id = 11 ;
export const createProduct = (obj) => {
    const result = findCat(obj.category_id)
    if(result<0){ return undefined}
    obj["id"] = id;
    product.push(obj);
    id++;
    return obj ;
}

export const updateProduct = (obj) => {
    const index = findproduct(obj.id);
    if(index < 0 ){return undefined}
    if(obj.name !== undefined){
        product[index].name = obj.name;
    }
    if(obj.price !== undefined){
        product[index].price = obj.price;
    }
    if(obj.category_id !== undefined){
        const result = findCat(obj.category_id)
        if(result < 0){return -1}
        product[index].category_id = obj.category_id;
    }
    return product[index];
}

export const getall = () => {
    return product;
}

export const getId = (id) => {
    return product.find(el => el.id == id)
}

export const deleteid = (id) => {
    const index  =  product.findIndex(el => el.id == id)
    if(index < 0) {return undefined}
    const temp = product[index]
    product.splice(index,1);
    return temp;
}


const findCat = (id) => {
    for(let i = 0 ; i < categories.length ; i++){
        if( categories[i].category_id == id)
        {
            return id;
        }
    }
    return -1 ;
}

const findproduct = (id) => {
    for(let i = 0 ; i < product.length ; i++){
        if( product[i].id == id)
        {
            return i;
        }
    }
    return -1 ;
}

