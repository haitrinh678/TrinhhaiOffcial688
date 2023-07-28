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
 
 
    const emptyCart = carts.length == 0 ? `<img style='width:100%;height:100%; opacity: 0.7;' src='https://www.adasglobal.com/img/empty-cart.png' />` : null;

   const renderCarts = carts
     .map((itemInCart) => {
       return `<div class="box">
     <i class="fas fa-times deleteItemInCart" data-id="${itemInCart.id}"></i>
     <img src="${itemInCart.image}" alt="">
     <div class="content">
       <h3>${itemInCart.name}</h3>
       <span class="quantity">${itemInCart.quantityInCart}</span>
       <span class="multiply ">x</span>
       <span class="price">${Number(itemInCart.price).toLocaleString('de-DE')} ₫</span>
     </div>
   </div>`;
     })
     .join("");
   shoppingCart.innerHTML = emptyCart ? emptyCart : renderCarts;
 
   renderTotal.innerHTML = emptyCart
     ? ""
     : `<h3 class="total">Tổng: <span class='totalProduct'>${totalQuantity.toLocaleString('de-DE')} ₫</span></h3>
   <a href="../../checkout.html"  class="btn checkoutCart">Thanh Toán</a>`;
 }
function deleteItemInCart(id) {
  const carts = localStorage.getItem("carts")
    ? JSON.parse(localStorage.getItem("carts"))
    : null;
  const newCart = carts.filter((item) => item.id !== id);
  localStorage.setItem("carts", JSON.stringify(newCart));
  displayItemInCart();
}
displayItemInCart();
 document.addEventListener("click", (e) => {
  if (e.target.closest(".deleteItemInCart")) {
    const id = e.target.getAttribute("data-id");
    deleteItemInCart(id);
  }
  return;
});