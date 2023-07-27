function displayItemInCart() {
   const carts = localStorage.getItem("carts")
     ? JSON.parse(localStorage.getItem("carts"))
     : null;
     
   const totalQuantity = carts.reduce(
     (total, product) => total + (product.quantityInCart * product.price),
     0
   );
 
   const shoppingCart = document.querySelector(".renderListCart");
   const renderTotal = document.querySelector(".renderTotal");
 
 
    const emptyCart = carts.length == 0 ? `<img style='width:100%;height:100%;' src='https://www.adasglobal.com/img/empty-cart.png' />` : null;

   const renderCarts = carts
     .map((itemInCart) => {
       return `<div class="box">
     <i class="fas fa-times deleteItemInCart" data-id="${itemInCart.id}"></i>
     <img src="${itemInCart.image}" alt="">
     <div class="content">
       <h3>${itemInCart.name}</h3>
       <span class="quantity">${itemInCart.quantityInCart}</span>
       <span class="multiply ">x</span>
       <span class="price">${itemInCart.price} ₫</span>
     </div>
   </div>`;
     })
     .join("");
   shoppingCart.innerHTML = emptyCart ? emptyCart : renderCarts;
 
   renderTotal.innerHTML = emptyCart
     ? ""
     : `<h3 class="total">total :<span class='totalProduct'>${totalQuantity.toFixed(3)} ₫</span></h3>
   <a href="../../checkout.html"  class="btn checkoutCart">checkout cart</a>`;
 }

 displayItemInCart();