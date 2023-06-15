
import {fetchDataFromAPI} from "./utils/fetchData.js";

const allProductsLink = "http://localhost:5000/api/products/";

const favoriteSpan = document.querySelector(".favorite-span");
const cartSpan = document.querySelector(".cart-span");


const countOrder = (data)=>{
	let count = 0;
	data.forEach(order=> count+= order.quantity)
	return count;

}

if(localStorage.getItem("cart")){
	let allData = JSON.parse(localStorage.getItem("cart"));
	cartSpan.innerText = countOrder(allData);
} else {
	localStorage.setItem("cart", "[]");
	cartSpan.innerText = 0;
}


if(localStorage.getItem("favorites")){
	let allData = JSON.parse(localStorage.getItem("favorites"));
	favoriteSpan.innerText = allData.length;
} else {
	localStorage.setItem("favorites", "[]");
	favoriteSpan.innerText = 0;
}

(async()=>{
	const dataFromApi = await fetchDataFromAPI(allProductsLink);
	const allProducts = dataFromApi.data;

	
	document.addEventListener("click", e=>{
		console.log("here")
		if(e.target.classList.contains("cart")){
			let orderID = e.target.getAttribute("data-id");
			let mainProduct;
			
			allProducts.forEach(order=>{
				if(order._id == orderID){
					mainProduct = order;

				}
			})
			let orderValue = {
				name: mainProduct.name,
				id : mainProduct._id,
				Image: mainProduct.image,
				price: mainProduct.price,
				quantity: 1
			};
			
			let allStoreData = JSON.parse(localStorage.getItem("cart"));
			if(allStoreData.length != 0){
				let recentOrder = allStoreData.filter(order=> order.id == orderValue.id)
				if(recentOrder.length != 0 ){
					allStoreData.forEach(order=>{
						if(order.id == recentOrder[0].id){
							order.quantity++;	
						}
					
					})
					cartSpan.innerText = countOrder(allStoreData);
					localStorage.setItem("cart", JSON.stringify(allStoreData))
				}else{
					allStoreData.push(orderValue);
					 	cartSpan.innerText = countOrder(allStoreData);
						localStorage.setItem("cart", JSON.stringify(allStoreData))
				}
				
			}else{
				allStoreData.push(orderValue);
						cartSpan.innerText = countOrder(allStoreData);
						localStorage.setItem("cart", JSON.stringify(allStoreData))
			}

		}
	})
})();


(async()=>{
	const dataFromApi = await fetchDataFromAPI(allProductsLink);
	const allProducts = dataFromApi.data;

	
	document.addEventListener("click", e=>{
		if(e.target.classList.contains("favorites")){
			let orderID = e.target.getAttribute("data-id");
			let mainProduct;
			
			allProducts.forEach(order=>{
				if(order._id == orderID){
					mainProduct = order;

				}
			})
			let orderValue = {
				name: mainProduct.name,
				id : mainProduct._id,
				Image: mainProduct.image,
				price: mainProduct.price,
				quantity: 1
			};
			
			let allStoreData = JSON.parse(localStorage.getItem("favorites"));
			if(allStoreData.length != 0){
				let recentOrder = allStoreData.filter(order=> order.id == orderValue.id)
				// if(recentOrder.length != 0 ){
				// 	allStoreData.forEach(order=>{
				// 		if(order.id == recentOrder[0].id){
				// 			order.quantity++;	
				// 		}
					
				// 	})
				// 	cartSpan.innerText = countOrder(allStoreData);
				// 	localStorage.setItem("cart", JSON.stringify(allStoreData))
				// }
				if(recentOrder.length == 0 ){
					allStoreData.push(orderValue);
					 	favoriteSpan.innerText = allStoreData.length;
						localStorage.setItem("favorites", JSON.stringify(allStoreData))
				}
				
			}else{
				allStoreData.push(orderValue);
						favoriteSpan.innerText = allStoreData.length;
						localStorage.setItem("favorites", JSON.stringify(allStoreData))
			}

		}
	})
})();




/// Products in cart 



const cardBody = document.getElementById('products')

const cardItems = JSON.parse(localStorage.getItem("cart"));


console.log(cardItems)
console.log(cardItems[0].name)
console.log(cardItems)




for (let i = 0; i < cardItems.length; i++) {


  cardBody.innerHTML += `
    <tr>
    <td class="align-left">
      <img src="${cardItems[i].Image}" alt="" style="width: 50px" />
      ${cardItems[i].name}
    </td>
    <td id='price' class="align-middle">$${cardItems[i].price}</td>
    <td class="align-middle">
      <div class="input-group quantity mx-auto" style="width: 100px">
        <div class="input-group-btn">
          <button id="minus"   type="button" class="minus decBtn btn btn-sm btn-primary btn-minus">
            <i class="fa fa-minus"></i>
          </button>
        </div>
        <input type="text" id="qant" class="quantityVal form-control form-control-sm bg-secondary border-0 text-center"
          value="1" />
        <div class="input-group-btn">
          <button id="plus" type="button" class=" plus incBtn btn btn-sm btn-primary btn-plus">
            <i class="fa fa-plus"></i>
          </button>
        </div>
      </div>
    </td>
    <td id="total" class="align-middle">${cardItems[i].price}</td>
    <td class="align-middle">
      <button class="btn btn-sm btn-danger closeBtn" type="button">
        <i class="fa fa-times"></i>
      </button>
    </td>
  </tr>
    `


}


// Delete Product Button
cardBody.addEventListener('click', function(event) {
	if (event.target.classList.contains('closeBtn')) {
	  const row = event.target.closest('tr');
	  const index = Array.from(cardBody.children).indexOf(row);
  
	  // Remove the row from the HTML
	  row.remove();
  
	  // Remove the corresponding item from the cardItems array
	  cardItems.splice(index, 1);
  
	  // Update the local storage with the modified cardItems array
	  localStorage.setItem('cart', JSON.stringify(cardItems));
	}
  });