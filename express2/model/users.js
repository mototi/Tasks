const users = [ ]; 

export const register = (obj) => {
    users.push(obj);
}


export const getUser = (obj) => {
    return users.find( user => user.email == obj.email && user.password == obj.hashed_pass)
}


