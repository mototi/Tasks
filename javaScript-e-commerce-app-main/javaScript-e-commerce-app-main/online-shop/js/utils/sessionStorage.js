

export const saveDataInSessionStorage = (userData)=>{
	sessionStorage.setItem("userData", JSON.stringify(userData));
	
}


export const getDataFromSessionStorage = (userDataKey)=>{
	
	let Data = sessionStorage.getItem(userDataKey);
	let userData = JSON.parse(Data);
	return userData;

}