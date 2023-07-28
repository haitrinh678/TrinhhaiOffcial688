
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

function displayInfoUser() {
  const current_user = localStorage.getItem("current_user")
    ? JSON.parse(localStorage.getItem("current_user"))
    : null;
  const btnLogout = document.querySelector(".logout");

  if (current_user) {
    hideLoginForm();
    const infoUser = document.querySelector(".info-user h3");
    infoUser.innerHTML = `${current_user.user.fullname}`;
    btnLogout.innerHTML = "Đăng xuất";
  }
}
function hideLoginForm() {
   const login = document.querySelector(".login");
   login.classList.add("hidden");
 }
 
function handleLogout() {
  localStorage.removeItem("current_user");
  localStorage.removeItem("carts");

  window.location.reload();
}
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { email, password } = loginForm;
  try {
    const handleLogin = await axios.post("http://localhost:3000/signin", {
    email: email.value,
    password: password.value,
    });
    if (handleLogin.status == 200) {
    window.location = "../../index.html#";
    alert("Đăng Nhập Thành Công, Chào Mừng Bạn Đã Đến với Nhà Hàng của chúng tôi!");
    localStorage.setItem("current_user", JSON.stringify(handleLogin.data));
    FormLogin.classList.toggle("active");
    hideLoginForm();
      displayInfoUser();
  }
  } catch (error) {
    alert("Đăng nhập thất bại,Tài khoản hoặc mật khẩu không chính xác !");
  }

});

document.addEventListener("DOMContentLoaded", (e) => {
  displayInfoUser();

});

document.addEventListener("click", (e) => {
  if (e.target.closest(".logout")) {
    handleLogout();
  }
  return;
});
