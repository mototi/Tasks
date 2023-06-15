const productToBuy = document.getElementById('productsBuy')





const cardBody = document.getElementById('products')

const cardItems = JSON.parse(localStorage.getItem("cart"));


const subtotal = document.getElementById('Subtotal')

const total = document.getElementById('total')




for (let i = 0; i < cardItems.length; i++) {


    productToBuy.innerHTML += `
    <div class='d-flex justify-content-between'>
    <p>${cardItems[i].name} </p>
    <p id='prices'>$${cardItems[i].price}</p>
    </div>
    `   
}



    const allPrices = cardItems.map(e=>e.price)

    let stotal = allPrices.reduce((x, y) => {
        {
            return x + y
        }
    })

    console.log(stotal)



    subtotal.innerHTML = stotal


    total.innerHTML = stotal -  (stotal * (15/100))
