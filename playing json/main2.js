const {readFileSync ,writeFileSync} = require('fs')

const res = JSON.parse( readFileSync("./problem2.json" , {encoding : "utf-8"}) ); 

const getdates = (res) => {
    let xr0 = res.accidents[0].date.split("/");
    let xr1 = res.accidents[1].date.split("/");
    let xr2 = res.accidents[2].date.split("/");

    return [xr0, xr1, xr2];
}
let d =  getdates(res);


const moment1 =  require('moment');

let date = { };
let D1 = moment1().year(d[0][2]).month(d[0][0]-1).date(d[0][1]).format("YYYY-MM-DD") ;
let D2 = moment1().year(d[1][2]).month(d[1][0]-1).date(d[1][1]).format("YYYY-MM-DD");
let D3 = moment1().year(d[2][2]).month(d[2][0]-1).date(d[2][1]).format("YYYY-MM-DD");

date.date1 = D1;
date.date2 = D2;
date.date3 = D3;


writeFileSync ( "./output2.json" , JSON.stringify(date) , {encoding : "utf-8"});    




