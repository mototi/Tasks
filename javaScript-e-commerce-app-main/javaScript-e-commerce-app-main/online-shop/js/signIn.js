
import{postData} from "./utils/fetchData.js";
import{saveDataInSessionStorage} from "./utils/sessionStorage.js";

const email = document.getElementById("email-input");
const password = document.getElementById("password-input");
const loginButton = document.getElementById("login-button");
const alertBox = document.getElementById("hideShowAlert");
const failRequestAlert = document.getElementById("alert-on-fail-api-post");
const goToHomePage = document.getElementById("goToHomePage");

const url = 'http://localhost:5000/api/users/login'; 



const goToHomePageFunction = ()=>{
	window.location.href = 'index.html';
}


const loginFunction = async()=>{
	loginButton.classList.add("disabled");
	const data = {
		email: email.value,
		password: password.value
	  };
	  
	  let callAPIResponse = await postData(url, data);
	  if (callAPIResponse){
		failRequestAlert.classList.add("hidden");
	

		const userDataFromAPIResponse = {
			"first_name": callAPIResponse.first_name,
			"last_name": callAPIResponse.last_name,
			"email": callAPIResponse.email,
			"token": callAPIResponse.token
		  };
		 saveDataInSessionStorage(userDataFromAPIResponse);
		 alertBox.classList.remove("hidden");

		 // redirected to home page 
		 setTimeout(()=>{goToHomePageFunction()}, 5000);

	  }else{
		console.log("no")

		failRequestAlert.classList.remove("hidden");
	  }
	  loginButton.classList.remove("disabled");	  
}

loginButton.addEventListener("click", loginFunction);

goToHomePage.addEventListener("click", goToHomePageFunction);




