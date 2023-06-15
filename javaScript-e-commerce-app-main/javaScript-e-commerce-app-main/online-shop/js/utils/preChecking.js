 
 import {getDataFromSessionStorage} from "./sessionStorage.js";
 
 // check if he logged in before and we have token already or not 

const checkIfToken = () =>{
	const ifLoggedIn = () => {
		let DataFromSessionStorage =  getDataFromSessionStorage("userData");
		
		if(!DataFromSessionStorage ){
			
			window.location.href = 'signIn.html';
		}
	  }
	
	 window.onpaint = ifLoggedIn();
}