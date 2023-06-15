// get API data 
export async function fetchDataFromAPI(URL){
	
	try{
		
		let dataFromAPI = await fetch(URL);
		let dataParsed = await dataFromAPI.json();
		return dataParsed;
	}
	catch(error){
		console.log(error);
		return error;
	}
};

// post API data
export async function postData(URL, data) {

	try {
	  const response = await fetch(URL, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	
	  });
	  
	  if (!response.ok) {
		console.log(`Request fail - response.status : ${response.status}`)
		throw new Error(response.status);
		
	  }
	  const responseData = await response.json();
	  console.log(`Request done`)
	  return responseData;
	} catch (error) {
		console.log(`Request fail - error : ${error}`)
	  return null;
	}
  }



// export {postData, fetchDataFromAPI};