
import {postData} from "./utils/fetchData.js";
import {saveDataInSessionStorage} from "./utils/sessionStorage.js";



// global variables
const firstName = document.getElementById("inputFirstName");
const lastName = document.getElementById("inputLastName");
const email = document.getElementById("inputEmail");
const password = document.getElementById("inputPassword");
const registerButton = document.getElementById("registerButton");
const alertBox = document.getElementById("hideShowAlert");
const failRequestAlert = document.getElementById("alert-on-fail-api-post");
const goToLoginScreen = document.getElementById("goToLoginScreen");
const goToHomePage = document.getElementById("goToHomePage");


const url = 'http://localhost:5000/api/users/register'; 









const goToLoginScreenFunction = ()=>{
	window.location.href = 'signIn.html';
}

const goToHomePageFunction = ()=>{
	window.location.href = 'index.html';
}





const sendDataToDatabase = async()=>{
	registerButton.classList.add("disabled");
	failRequestAlert.classList.add("hidden");
	const data = {
		"first_name": firstName.value,
		"last_name": lastName.value,
		"email": email.value,
		"password": password.value
	  };

	
	

	let callAPIResponse = await postData(url, data);
	  if (callAPIResponse){
	

		const userDataFromAPIResponse = {
			"first_name": callAPIResponse.first_name,
			"last_name": callAPIResponse.last_name,
			"email": callAPIResponse.email,
			"token": callAPIResponse.token
		  };
		 saveDataInSessionStorage(userDataFromAPIResponse);
		 alertBox.classList.remove("hidden");

	  }else{
		console.log("no")

		failRequestAlert.classList.remove("hidden");
	  }

	
	  registerButton.classList.remove("disabled");
}




registerButton.addEventListener("click", sendDataToDatabase);
goToLoginScreen.addEventListener("click", goToLoginScreenFunction);
goToHomePage.addEventListener("click", goToHomePageFunction);



