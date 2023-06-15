const url = "http://localhost:5000/api/products/";
let allProducts = [];

const getProduct = async () => {
  try {
    const productData = await fetch(url);
    const products = await productData.json();
    return products.data;
  } catch (error) {
    console.log(error);
  }
};

const RenderProducts = async () => {
  allProducts = await getProduct();
  DisplayAllProduct(allProducts);
};

const DisplayAllProduct = (products) => {
  const showProduct = document.getElementById("show-product");
  showProduct.innerHTML = "";
  products.map((data) => {
    showProduct.innerHTML += SingleProduct(data);
  });
};

// const addFavorite = async () => {
//   const favorite = document.getElementById("heart");
//   console.log(favorite);
// };
// addFavorite();

const SingleProduct = (data) => {
  return `
  <div class="col-lg-4 col-md-6 col-sm-6 pb-1">
  <div class="product-item bg-light mb-4">
      <div class="product-img position-relative overflow-hidden">
          <img class="img-fluid w-100" src=${data.image} alt="">
          <div class="product-action">
              <a class="btn btn-outline-dark btn-square" ><i data-id="${data._id}" class="fa fa-shopping-cart cart"></i></a>
              <a class="btn btn-outline-dark btn-square" ><i data-id="${data._id}" class="far fa-heart favorites"></i></a>
              <a class="btn btn-outline-dark btn-square" ><i class="fa fa-sync-alt"></i></a>
              <a class="btn btn-outline-dark btn-square" ><i class="fa fa-search"></i></a>
          </div>
      </div>
      <div class="text-center py-4 overflow-hidden">
          <a class="h6 text-decoration-none text-truncate" href="">${data.name}</a>
          <div class="d-flex align-items-center justify-content-center mt-2">
              <h5>${data.price}</h5><h6 class="text-muted ml-2"><del>$123.00</del></h6>
          </div>
          <div class="d-flex align-items-center justify-content-center mb-1">
              <small class="fa fa-star text-primary mr-1"></small>
              <small class="fa fa-star text-primary mr-1"></small>
              <small class="fa fa-star text-primary mr-1"></small>
              <small class="fa fa-star text-primary mr-1"></small>
              <small class="fa fa-star text-primary mr-1"></small>
              <small>(${data.rating_count})</small>
          </div>
      </div>
  </div>
</div>`;
};

RenderProducts();

const sizeFilterInputs = document.querySelectorAll(".size-filter-inputs");
const colorFilterInputs = document.querySelectorAll(".color-filter-inputs");
const priceFilterInputs = document.querySelectorAll(".price-filter-inputs");


const ResetFilterInputsState = (sizeFilterInputs, colorFilterInputs, priceFilterInputs) => {
  sizeFilterInputs.forEach((item, index) => {
    if(index !== 0) {
      item.checked = false;
    } else {
      item.checked = true;
    }
  });

  colorFilterInputs.forEach((item, index) => {
    if(index !== 0) {
      item.checked = false;
    } else {
      item.checked = true;
    }
  });

  priceFilterInputs.forEach((item, index) => {
    if(index !== 0) {
      item.checked = false;
    } else {
      item.checked = true;
    }
  });
}

sizeFilterInputs.forEach((input) => {
  input.addEventListener("change", (e) => {
    ResetFilterInputsState(sizeFilterInputs, colorFilterInputs, priceFilterInputs);
    sizeFilterInputs[0].checked = false;
    e.target.checked = true;
    const currentValue = e.target.parentNode.querySelector(
      ".custom-control-label"
    ).innerHTML;
    if (currentValue !== "All Size") {
      DisplayAllProduct(
        allProducts.filter((item) => item.size === currentValue.toLowerCase())
      );
    } else {
      DisplayAllProduct(allProducts);
    }
  });
});

colorFilterInputs.forEach((input) => {
  input.addEventListener("change", (e) => {
    ResetFilterInputsState(sizeFilterInputs, colorFilterInputs, priceFilterInputs);
    colorFilterInputs[0].checked = false;
    e.target.checked = true;
    const currentValue = e.target.parentNode.querySelector(
      ".custom-control-label"
    ).innerHTML;
    if (currentValue !== "All Color") {
      DisplayAllProduct(
        allProducts.filter((item) => item.color === currentValue.toLowerCase())
      );
    } else {
      DisplayAllProduct(allProducts);
    }
  });
});

priceFilterInputs.forEach((input) => {
  input.addEventListener("change", (e) => {
    ResetFilterInputsState(sizeFilterInputs, colorFilterInputs, priceFilterInputs)
    priceFilterInputs[0].checked = false;
    e.target.checked = true;
    const currentValue = e.target.parentNode.querySelector(
      ".custom-control-label"
    ).innerHTML;
    let number = currentValue.replaceAll("$", "").split("-");

    if (currentValue !== "All Price") {
      DisplayAllProduct(
        allProducts.filter(
          (item) =>
            item.price >= parseFloat(number[0]) &&
            item.price <= parseFloat(number[1])
        )
      );
    } else {
      DisplayAllProduct(allProducts);
    }
  });
});
