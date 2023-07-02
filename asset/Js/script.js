let searchForm = document.querySelector(".search-form");
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

let FormLogin = document.querySelector(".login-form");
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
