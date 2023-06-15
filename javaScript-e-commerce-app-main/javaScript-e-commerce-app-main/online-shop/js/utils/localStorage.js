

export const sendDataToLocalStorage = (stringKeyName, stringValue)=>{
	localStorage.setItem(stringKeyName, stringValue);
}

export const getDataFromLocalStorage = (stringKeyName)=>{
	
	const valueFromLocalStorage =  localStorage.getItem(stringKeyName);
	const value = JSON.parse(valueFromLocalStorage);
	 //console.log(`data from local storage : ${value}`)
	 return value;

	 localStorage.clear()
}