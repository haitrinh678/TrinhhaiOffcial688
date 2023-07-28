
let searchForm = document.querySelector(".search-form");
const loginForm = document.getElementById("login-form");
let FormLogin = document.querySelector(".login-form");

document.querySelector("#search-btn").onclick = () => {
  searchForm.classList.toggle("active");
  cart.classList.remove("active");
  FormLogin.classList.remove("active");
  navBar.classList.remove("active-menu");
};

let cart = document.querySelector(".shopping-cart");
document.querySelector("#cart-btn").onclick = () => {
  cart.classList.toggle("active");
  searchForm.classList.remove("active");
  FormLogin.classList.remove("active");
  navBar.classList.remove("active-menu");
};

document.querySelector("#login-btn").onclick = () => {
  FormLogin.classList.toggle("active");
  searchForm.classList.remove("active");
  cart.classList.remove("active");
  navBar.classList.remove("active-menu");
};

let navBar = document.querySelector(".nav-bar");
document.querySelector("#menu-btn").onclick = () => {
  navBar.classList.toggle("active-menu");
  searchForm.classList.remove("active");
  cart.classList.remove("active");
  FormLogin.classList.remove("active");
};

window.onscroll = () => {
  searchForm.classList.remove("active");
  cart.classList.remove("active");
  FormLogin.classList.remove("active");
  navBar.classList.remove("active-menu");
};

// home-slides

let slides = document.querySelectorAll(".home .slides-container .slide");
let index = 0;

function next() {
  slides[index].classList.remove("active");
  index = (index + 1) % slides.length;
  slides[index].classList.add("active");
}

function prev() {
  slides[index].classList.remove("active");
  index = (index - 1 + slides.length) % slides.length;
  slides[index].classList.add("active");
}

function searchProduct() {
  const listItem = document.querySelector("#list-item");
  const searchBox=document.querySelector('#search-box')
  const searchIcon=document.querySelector('.searchIcon')
  searchIcon.addEventListener('click',async (e)=>{
      const searchValue=searchBox.value
      const fullTextSearch=await axios.get(`http://localhost:3000/products?q=${searchValue}`)
      displayItem(fullTextSearch.data)
      listItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
  })

}


function hideLoginForm() {
  const login = document.querySelector(".login");
  login.classList.add("hidden");
}

function displayInfoUser() {
  const current_user = localStorage.getItem("current_user")
    ? JSON.parse(localStorage.getItem("current_user"))
    : null;
const btnLogout = document.querySelector(".logout");

  if (current_user) {
    hideLoginForm();
    const infoUser = document.querySelector(".info-user h3");
    infoUser.innerHTML = `${current_user.user.fullname}`;
    btnLogout.innerHTML='Đăng xuất'
  }
}

async function getListItem() {
  const products = await axios.get("http://localhost:3000/products");
  return products;
}

function createCart() {
  let userCart = localStorage.getItem(`carts`);
  if (!userCart) {
    // Nếu chưa có cart, khởi tạo cart mặc định
    const defaultCart = [];
    userCart = JSON.stringify(defaultCart);
    localStorage.setItem(`carts`, userCart);
  }
}


function hanldeAddToCart() {
  const products = localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : null;

  const listItem = document.querySelector("#list-item");
  listItem.addEventListener("click", (e) => {
    if (e.target.closest(".addToCart")) {
        const carts = localStorage.getItem("carts")
    ? JSON.parse(localStorage.getItem("carts"))
    : null;
      const id = e.target.getAttribute("data-id");
      const findProduct = products.find((item) => item.id == id);
      const cartIndex = carts.findIndex((item) => item.id === id);
      if (cartIndex !== -1) {
        // Sản phẩm đã có trong giỏ hàng, cộng số lượng lên 1
        carts[cartIndex].quantityInCart += 1;
      } else {
        // Sản phẩm chưa có trong giỏ hàng, thêm sản phẩm vào giỏ hàng
        const newProduct = {
          ...findProduct,
          quantityInCart: 1,
        };
        carts.push(newProduct);
      }
      alert("Thêm sản phẩm vào giỏ hàng thành công")
      // Lưu danh sách sản phẩm vào localStorage sau khi cập nhật giỏ hàng
      localStorage.setItem("carts", JSON.stringify(carts));
      displayItemInCart();
    }
    return;
  });
}


function deleteItemInCart(id) {
  const carts = localStorage.getItem("carts")
    ? JSON.parse(localStorage.getItem("carts"))
    : null;
  const newCart = carts.filter((item) => item.id !== id);
  localStorage.setItem("carts", JSON.stringify(newCart));
  displayItemInCart();
}

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
      <h3  style="font-size:1.6rem">${itemInCart.name}</h3>
      <span class="quantity">${itemInCart.quantityInCart}</span>
      <span class="multiply ">x</span>
      <span class="price">${Number(itemInCart.price).toLocaleString('de-DE')} đ</span>
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

function displayItem(products) {
  const listItem = document.querySelector("#list-item");
  const renderItem = products
    .map((product) => {
      return `<div class="box">
    <div class="icons">
      <div  class="fas fa-shopping-cart addToCart" data-id="${product.id}"></div>
      <div  class="fas fa-heart"></div>
      <div  class="fas fa-eye"></div>
    </div>
    <div class="image">
      <img src="${product.image}" alt="" />
    </div>
    <div class="content">
      <h3>${product.name}</h3>
      <div class="price">${Number(product.price).toLocaleString('de-DE')} ₫</div>
      <div class="stars">
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="far fa-star"></i>
      </div>
    </div>
  </div>`;
    })
    .join("");
  listItem.innerHTML = renderItem;
}

function handleLogout(){
  localStorage.removeItem("current_user");
  localStorage.removeItem("carts");

  window.location.reload();
}

document.addEventListener("DOMContentLoaded", (e) => {
  createCart();
  displayInfoUser();
  getListItem().then((result) => {
    localStorage.setItem("products", JSON.stringify(result.data));
    displayItem(result.data);
  });
  searchProduct()
  displayItemInCart();
  hanldeAddToCart();

});

document.addEventListener("click", (e) => {
  if (e.target.closest(".deleteItemInCart")) {
    const id = e.target.getAttribute("data-id");
    deleteItemInCart(id);
  }
  if(e.target.closest(".checkoutCart")){
    handleCheckout()
  }
  if(e.target.closest('.logout')){
    handleLogout()
  }
  return;
});
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { email, password } = loginForm;
  try {
    const handleLogin = await axios.post("http://localhost:3000/signin", {
    email: email.value,
    password: password.value,
    });
    if (handleLogin.status == 200) {
      alert("Đăng Nhập Thành Công, Chào Mừng Bạn Đã Đến với Nhà Hàng của chúng tôi!");
    localStorage.setItem("current_user", JSON.stringify(handleLogin.data));
    FormLogin.classList.toggle("active");
    hideLoginForm();
    displayInfoUser();
  }
  } catch (error) {
    alert("Đăng nhập thất bại, Tài khoản hoặc mật khẩu không chính xác.");
  }
});
