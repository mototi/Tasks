
import { FavoritesCount } from "./models/Favorites.js";
import { sendDataToLocalStorage, getDataFromLocalStorage } from "./utils/localStorage.js";




//import {fetchDataFromAPI} from "./utils/fetchData.js";

// global variables 
let mainURL = "http://localhost:5000/api/categories/";
let featuredProducts = "http://localhost:5000/api/products/getFeatured";
let recentProducts = "http://localhost:5000/api/products/getRecent";
const favoritesNumber = document.getElementById("favoritesNumber");





const updateFavoritesNumber = ()=>{
	favoritesNumber.innerText = getDataFromLocalStorage("favoritesCount");
	
}

updateFavoritesNumber();

	// object from class
	const favoritesCount = new FavoritesCount();


const increaseAndDecreaseTheFavoritesNumber = (increaseOrDecreaseMethode)=>{

increaseOrDecreaseMethode;

sendDataToLocalStorage("favoritesCount", JSON.stringify(favoritesCount.getCount()));
getDataFromLocalStorage("favoritesCount");

}






// data of categories in header
const showDataOnWebsite = async()=>{

	let dataFromAPI = await getDataFromAPI(mainURL);

	
	let listOfCategories = dataFromAPI.data;
	let categoriesParentHTMLElement = document.querySelector(".navbar-nav");

	
	
	for (let i = 0; i < listOfCategories.length; i++) {
		
		
		let newAnchorTag = document.createElement("a");
		newAnchorTag.href = "#"
		newAnchorTag.classList.add("nav-item");
		newAnchorTag.classList.add("nav-link");
	
		
		if(listOfCategories[i].name != undefined){
			newAnchorTag.innerText = listOfCategories[i].name;
		 categoriesParentHTMLElement.appendChild(newAnchorTag);
		}
		
	  }
	
	//   console.log(categoriesParentHTMLElement);
}

// categories sorted by products count in descending order // show first 4
const categoriesSortedByProductsCountInDescendingOrder = async ()=>{

	let dataParsedFromAPI = await getDataFromAPI(mainURL);
	let listOfCategories = dataParsedFromAPI.data;
	let categoriesParentHTMLElement = document.querySelector("#categoriesSectionDiv"); 

	// sort descending
	listOfCategories.sort(function(a, b){return b.productCount - a.productCount});

	//console.log(listOfCategories);
	

	// take the first top 4
	for (let i = 0; i < 4; i++) {
		
		// first outer parent
		let bigDiv = document.createElement("div");   
		bigDiv.classList.add("col-lg-3");
		bigDiv.classList.add("col-md-4");
		bigDiv.classList.add("col-sm-6");
		bigDiv.classList.add("pb-1");

		// second outer parent
		let secondDiv = document.createElement("a");   
		secondDiv.classList.add("text-decoration-none");
		secondDiv.href = "#"

		bigDiv.appendChild(secondDiv);

		// third outer parent
		let thirdDiv = document.createElement("div");   
		thirdDiv.classList.add("cat-item");
		thirdDiv.classList.add("d-flex");
		thirdDiv.classList.add("align-items-center");
		thirdDiv.classList.add("mb-4");

		secondDiv.appendChild(thirdDiv);
		
		// image div holder
		let imageDivHolder = document.createElement("div");   
		imageDivHolder.classList.add("overflow-hidden");
		imageDivHolder.style.width = "100px";
		imageDivHolder.style.height = "100px";

		thirdDiv.appendChild(imageDivHolder);

		// category image
		let image =  document.createElement("img"); 
		image.classList.add("img-fluid");
		image.alt = "#"
		
		// add image
		image.src = `${listOfCategories[i].image}`;
		imageDivHolder.appendChild(image);


		
	
		// name div holder
		let nameDivHolder = document.createElement("div");   
		nameDivHolder.classList.add("flex-fill");
		nameDivHolder.classList.add("pl-3");
		
		thirdDiv.appendChild(nameDivHolder);

		// category image
		let categoryNameDiv =  document.createElement("h6"); 

		// add category names
		categoryNameDiv.innerHTML = `${listOfCategories[i].name}`;
		nameDivHolder.appendChild(categoryNameDiv);

		// category products number 
		let categoryProductsNumber =  document.createElement("small"); 
		categoryProductsNumber.classList.add("text-body");

		// add category products number 
		categoryProductsNumber.innerHTML = `${listOfCategories[i].productCount} Products`;
		nameDivHolder.appendChild(categoryProductsNumber);


		categoriesParentHTMLElement.appendChild(bigDiv);
		
		
	  }

	  //console.log(categoriesParentHTMLElement)
} 

// stars rating code 
const getRating = (rating)=>{
		 
	let star = `<small class="fa fa-star text-primary mr-1"></small>`;
	let halfStar = `<small class="fa fa-star-half-alt text-primary mr-1"></small>`;
	let container = [];
	const fullStars = Math.floor(rating);
	const hasHalfStar = (rating - fullStars) >= 0.5;
   

	if(!hasHalfStar){
	   
   		for (let i = 0; i < rating; i ++) {
			container.push(`${star}`);
   		}
	
	
	}else {
			
		for (let i = 0; i < rating-1; i ++) {
   			container.push(`${star}`);}
   			container.push(`${halfStar}`);
	}

	
	let ratingStars = container.join(" ").toString();
	return ratingStars;
}


// categories sorted by products count in descending order // show first 4
const getFeaturedAndRecentProducts  = async ({featuredProductsURL, parentDivID}={})=>{
	
	let dataParsedFromAPI = await getDataFromAPI(featuredProductsURL);
	let listOffeaturedProducts = dataParsedFromAPI.data;
	let featuredProductsParentHTMLElement = document.querySelector(parentDivID); 


	//console.log(`listOffeaturedProducts  : ${listOffeaturedProducts}`);
	

	
	

	// take the first top 4
	for (let i = 0; i < 8; i++) {
		
		// feature Product creation
		let featuredProductDiv = document.createElement("div");
		featuredProductDiv.classList.add("col-lg-3"); 
		featuredProductDiv.classList.add("col-md-4"); 
		featuredProductDiv.classList.add("col-sm-6"); 
		featuredProductDiv.classList.add("pb-1"); 
		featuredProductDiv.innerHTML = `
		<div class="product-item bg-light mb-4">
		  <div class="product-img position-relative overflow-hidden">
			<img class="img-fluid w-100" src="${listOffeaturedProducts[i].image}" alt="" />
			<div class="product-action">
			  <a
				class="btn btn-outline-dark btn-square"
				
				
				><i data-id="${listOffeaturedProducts[i]._id}" class="fa fa-shopping-cart cart"></i
			  ></a>
			  <a class="btn btn-outline-dark btn-square"
				><i data-id="${listOffeaturedProducts[i]._id}" class="far fa-heart favorites"></i
			  ></a>
			  <a class="btn btn-outline-dark btn-square"
				><i class="fa fa-sync-alt"></i
			  ></a>
			  <a class="btn btn-outline-dark btn-square" 
				><i class="fa fa-search"></i
			  ></a>
			</div>
		  </div>
		  <div class="text-center py-4">
			<a class="h6 text-decoration-none text-truncate" href=""
			  >${listOffeaturedProducts[i].name}</a
			>
			<div
			  class="d-flex align-items-center justify-content-center mt-2"
			>
			  <h5>$${listOffeaturedProducts[i].price}</h5>
			  <h6 class="text-muted ml-2"><del>$${(listOffeaturedProducts[i].price)-(listOffeaturedProducts[i].discount)}</del></h6>
			</div>
			<div
			  class="d-flex align-items-center justify-content-center mb-1"
			>
			  ${getRating (listOffeaturedProducts[i].rating)}
			  <small>(${listOffeaturedProducts[i].price})</small>
			</div>
		  </div>
		</div>
	 `;

		featuredProductsParentHTMLElement.appendChild(featuredProductDiv);
		
		
		
	  }

	 
} 





document.addEventListener('click', function(e) {
	let targetClasses = e.target.className;
	
	// const addToFavorites = ()=>{
		
	// }

	if (targetClasses.includes("addToFavoritesButton") &&  targetClasses.includes("notInFavoritesYet")){

		//console.log(`hna : ${e.target.parentNode.className}`)
		 if(e.target.children[0]){

			if(e.target.children[0].className.includes("addToFavoritesButton") &&  targetClasses.includes("notInFavoritesYet"))
			{
			
		//		console.log(`inside : ${e.target.children[0].className}`);
		e.target.children[0].classList.add('addedToFavorites');
		e.target.children[0].classList.remove('notInFavoritesYet');
		
		
		
		
		//console.log(`inside : ${e.target.children[0].className}`);

		} 
	}
	else if (e.target.parentNode.className.includes("addToFavoritesButton") &&  e.target.parentNode.className.includes("notInFavoritesYet")){
		console.log(`before outside : ${e.target.parentNode.classList}`);
		e.target.parentNode.classList.add('addedToFavorites');
		e.target.parentNode.classList.remove('notInFavoritesYet');
		console.log(`after outside : ${e.target.parentNode.classList}`);
	}
	// else{
	// 		//console.log(e.target.parentNode.className)
	// 	}
		
	

		
		
		console.log(e.target.className);
		e.target.classList.add('addedToFavorites');
		e.target.classList.remove('notInFavoritesYet');
		
		increaseAndDecreaseTheFavoritesNumber(favoritesCount.incementByOne());
		sendDataToLocalStorage("favoritesNumber", favoritesCount.getCount());
		updateFavoritesNumber();
		//favoritesNumber.innerText = favoritesCount.getCount();
		console.log(e.target.className);
		
		
	}
	
	
  });

 
  
	

// get data and run function on it

async function getDataFromAPI(URL){
	
	let dataParsed;
	
	try{
		
		let dataFromAPI = await fetch(URL);
		dataParsed = await dataFromAPI.json();
		return dataParsed;
	}
	catch(error){
		console.log(error);
		return error;
	}
};










showDataOnWebsite();
categoriesSortedByProductsCountInDescendingOrder();
getFeaturedAndRecentProducts( {featuredProductsURL : featuredProducts, parentDivID: "#featured-Products"});
getFeaturedAndRecentProducts( {featuredProductsURL : recentProducts, parentDivID: "#recent-products"});

// getDataFromAPI(mainURL, showDataOnWebsite);
// getDataFromAPI(mainURL, categoriesSortedByProductsCountInDescendingOrder);
// getDataFromAPI(featuredProducts, getFeaturedAndRecentProducts);
// getDataFromAPI(recentProducts, getFeaturedAndRecentProducts);
