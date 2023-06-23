import axios from "axios"


axios.get('https://api.escuelajs.co/api/v1/products').then( res => {
    

    axios.get('https://api.currencyfreaks.com/v2.0/rates/latest?apikey=4bd29e63042a4801adc8f4dc0a9befa5').then( result => {
        res.data.forEach(e => {
            e.price = Math.round(result.data.rates["EGP"] * Number(e.price)) ;
        })
        let arr = catigorize(res.data);
        console.log(arr);

    })  


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
