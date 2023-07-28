function generateId() {
  return Math.random().toString(16).slice(2);
}
function getTimestampInSeconds () {
  return Math.floor(Date.now() / 1000)
}
const order_status = {
  1: "Chưa giải quyết ",
  2: "Đang xử lý",
  3: "Đang giao",
  4: "Hoàn thành",
};
const payment_method = {
  1: "Thanh toán khi nhận hàng",
  2: "Thanh toán online",
};


function handleCheckout() {
  const current_user = localStorage.getItem("current_user")
? JSON.parse(localStorage.getItem("current_user"))
: null;

  const checkoutForm = document.getElementById("checkout-form");
  checkoutForm.addEventListener("submit", async (e) => {
    e.preventDefault();
      const carts = localStorage.getItem("carts")
    ? JSON.parse(localStorage.getItem("carts"))
      : null;
    if (carts.length == 0) {
      window.location="../../index.html#Food_order"
      alert("Không có sản phẩm trong giỏ hàng, Vui lòng nhấn OK để xem thêm sản phẩm tại đây!")
      return;
    }
    const { fullname, address, phoneNumber } = checkoutForm;
    const handleCheckout = await axios.post("http://localhost:3000/orders", {
      id: generateId(),
      payment_method: 1,
      user_id:current_user.user.id,
      fullname: fullname.value,
      address: address.value,
      order_date:getTimestampInSeconds(),
      phoneNumber: phoneNumber.value,
      order_items: carts,
    });
    if (handleCheckout.status == 201) {
      alert("Đặt hàng thành công");
      window.location.href = "../../orderHistory.html";
      localStorage.setItem("carts", JSON.stringify([]));
    }
  });
}
const current_user = localStorage.getItem("current_user")
? JSON.parse(localStorage.getItem("current_user"))
: null;
async function checkUserLogin() {
  if (!current_user) {
    window.location = "../../index.html";
    alert('Vui lòng đăng nhập để đặt hàng')
  }
}
checkUserLogin()
document.addEventListener("DOMContentLoaded", (e) => {
  const carts = localStorage.getItem("carts")
    ? JSON.parse(localStorage.getItem("carts"))
    : null;
   if (carts.length == 0) {
     alert("Vui lòng thêm sản phẩm vào giỏ hàng để thanh toán");
      window.location = "../../index.html#Food_order";
    }
  handleCheckout();
});
