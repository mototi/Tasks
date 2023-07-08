const products = [
   {
       "id": 1,
       "title": "Un producto que yo cree",
       "price": 1500,
       "description": "A description",
       "images": [
           "https://placeimg.com/640/480/any"
       ],
       "category": {
           "id": 1,
           "name": "string1",
           "image": "https://picsum.photos/640/640?r=379",
       }
   },
   {
       "id": 2,
       "title": "Un producto que yo cree",
       "price": 1500,
       "description": "A description",
       "images": [
           "https://placeimg.com/640/480/any"
       ],
       "category": {
           "id": 2,
           "name": "string2",
           "image": "https://picsum.photos/640/640?r=379",
       }
   },
   {
       "id": 3,
       "title": "My product",
       "price": 9999,
       "description": "A description",
       "images": [
           "https://placeimg.com/640/480/any"
       ],
       "category": {
           "id": 3,
           "name": "string3",
           "image": "https://picsum.photos/640/640?r=379",
       }
   }
]

export const getAllProducts = () => {
   return products;
}


export const getProductById = (id) => {
   return products.find(el => el.id == id);
 }

export const postProduct =  (obj) => {
   const element = products.find( el => el.category.id == obj.categoryId)
   obj["id"] = Math.floor(Math.random() * 501);
   if( !element ){
      const cat = {
         "id": obj.categoryId,
         "name": "",
         "image": ""
      }
      obj["category"] = cat;
      products.push(obj);
      return obj;
   }else{
      obj["category"] = element.category;
      products.push(obj);
      return obj;
   }
 }

export const UpdateProductById = (id , obj) => {
   let index = -1 ;
   for (let i = 0 ; i < products.length ; i++){
      if( products[i].id == id) {
         index = i ; 
         break;
      }
   }

   if( index < 0) { return undefined}

   if( obj.title != undefined ){
      products[index].title = obj.title;
   }
   if( obj.price != undefined ){
      products[index].price = obj.price;
   }
   if( obj.description != undefined ){
      products[index].description = obj.description;
   }
   if( obj.categoryId != undefined ){
      const element = products.find( el => el.category.id == obj.categoryId)
      if(element){
         products[index].category = element.category;
      }
   }
   if( obj.images != undefined ){
      products[index].images = obj.images;
   } 
   
   return products[index];
 }

export  const deleteProductById =  (id) => {
   let index = -1 ;
   for (let i = 0 ; i < products.length ; i++){
      if( products[i].id == id) {
         index = i ; 
         break;
      }
   }
   if( index < 0) { return undefined}
   products.splice(index,1)
   return true;
}

 
