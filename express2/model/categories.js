export const categories = [] ;

let id = 4 ;

export const creatCategory = (obj) => {
    obj["category_id"] = id ;
    categories.push(obj);
    id++;
    return obj;
}


export const putCategory = (obj) => {
    let index = -1 ;
    for (let i = 0 ; i < categories.length ; i++){
       if( categories[i].category_id == obj.category_id) {
          index = i ; 
          break;
       }
    }
    if( index < 0) { return undefined}
    categories.splice(index,1,obj)
    return categories[index];
}

export const getall = () => {
    return categories;
}

export const getById = (id) => {
    return categories.find( el => el.category_id == id)
}