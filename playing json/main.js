const {readFileSync ,writeFileSync} = require('fs')

const res = JSON.parse( readFileSync("./problem1.json" , {encoding : "utf-8"}) ); 


const addWH = (res) => {
    res.height  = "";
    res.weight  = "";
    writeFileSync ( "./problem1.json" , JSON.stringify(res) , {encoding : "utf-8"});
}
addWH(res);

const updatFluffyy = (res) => {
  res.name = "Fluffyy";
    writeFileSync ( "./problem1.json" , JSON.stringify(res) , {encoding : "utf-8"});
}
updatFluffyy(res);


const listactivities = (res) => {
    return [ ... res.catFriends[0].activities , ...res.catFriends[1].activities] ;
}
console.log( listactivities(res) );


const printnames = (res) => {
    return  `name 1 :  ${res.catFriends[0].name} \nname 2 : ${res.catFriends[1].name}`;
}
console.log( printnames(res) );


const calcweight = (res) => {
   return  Number(res.catFriends[0].weight) + Number(res.catFriends[1].weight);
}
console.log( `sum of weight = ${calcweight(res)}` );


const allactivities = (res) => {
    return [... res.activities , ...listactivities(res)];
}
console.log( allactivities(res));



const addnewactivities = (res) => {
    if( res.catFriends[0].activities.includes("new acivitiy") ||  res.catFriends[1].activities.includes("new act") ) return;
    res.catFriends[0].activities.push("new acivitiy");
    res.catFriends[1].activities.push("new act");
    writeFileSync ( "./problem1.json" , JSON.stringify(res) , {encoding : "utf-8"});
}
addnewactivities(res);



const changecolor = (res) => {
    res.catFriends[0].furcolor = "yellow"
    writeFileSync ( "./problem1.json" , JSON.stringify(res) , {encoding : "utf-8"});

}
changecolor(res);