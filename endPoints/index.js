import axios from "axios"
import http from 'http'
import {object , number , string , array} from 'yup'

const scheme = object({
    "title": string().required(),
    "price": number().required(),
    "description": string().required(),
    "categoryId": number().required(),
     "images": array(string().required())    
})

const server = http.createServer( (req , res) => {

    const get_post = async() =>{
        let  products ;
        let currency ;
        try {
             products = await axios.get('https://api.escuelajs.co/api/v1/products?offset=0&limit=10') ; 
             currency = await axios.get('https://api.currencyfreaks.com/v2.0/rates/latest?apikey=4bd29e63042a4801adc8f4dc0a9befa5') ;    
        } catch (error) {
            res.writeHead(500);
            res.end();
        }
        
        if(req.method === 'GET'){
            const url = new URL (`https://api.escuelajs.co/api/v1/products?${req.url}`)
            let pass_currency =  url.searchParams.get('/CUR')
            let current_currency = currency.data.rates[`${pass_currency}`]

            products.data.forEach(e => e.price = e.price * current_currency )

            let categorized = catigorize(products.data)

            res.setHeader('content-type','application/json')
            res.writeHead(200)
            res.write(JSON.stringify(categorized));
            res.end();
        }


        if (req.method === 'POST'){
            let chunks = []
    
            req.on('data' , (chunk) => {
                chunks.push(chunk);
            })
    
            req.on('end' , () => {
                let load = JSON.parse(chunks.toString());
                try {
                    let valid = scheme.validateSync(load , { strict : true });
                    axios.post('https://api.escuelajs.co/api/v1/products/', valid )
                    .then( (resp) => {
                        const url = new URL (`https://api.escuelajs.co/api/v1/products?${req.url}`)
                        let pass_currency =  url.searchParams.get('/CUR')
                        let current_currency = currency.data.rates[`${pass_currency}`]
                        resp.data.price = resp.data.price * current_currency ;
                         res.setHeader('content-type' , 'application/json')
                         res.writeHead(201)
                         res.write(JSON.stringify(resp.data))
                         res.end();
                     })
                } catch (error) {
                    res.writeHead(400)
                    res.end()
                }
                
            })
        }

    }
    get_post();    
}); 

server.listen( 8080 , () => {
    console.log("server listens on 8080 ");
})




const catigorize = (result) => {
    let ids_arr = new Set () ;
    let array = [ { category : {id : "" , name : ""} , products : []}]
    result.forEach(element => {
        if ( ids_arr.has(element.category.id) ) {
            
            let x = searchindex( element.category.id , array);
            if( x >= 0)
            array[x].products.push(element);
        }
        else 
        {
            let temp = {category : {id : `${element.category.id}` , name : `${element.category.name}` } , products : [element]}
            array.push(temp);
            ids_arr.add(element.category.id);
        }
    });
    array.splice(0,1);
    return array ;
}

let searchindex  = (id , arr) => {
    for (let i = 0 ; i < arr.length ; i++){
        if ( arr[i].category.id == id ) return i 
    }
    return -1 ;
}