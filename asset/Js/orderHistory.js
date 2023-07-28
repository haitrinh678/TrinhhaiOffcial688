function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes} ${day}/${month}/${year}`;
}
const current_user = localStorage.getItem("current_user")
? JSON.parse(localStorage.getItem("current_user"))
: null;
async function displayListOrder() {
  let list_order = document.querySelector(".list_order");
  const getListOrder = await axios.get(`http://localhost:3000/orders?user_id=${current_user.user.id}`);
  // const emptyOrder=getListOrder
  const renderListOrder = getListOrder.data.map(
    (order) => `   <tr>
   <td><span class="res-head">Id:</span>${order.id}</td>
   <td><span class="res-head">Fullname:</span>${order.fullname}</td>
   <td><span class="res-head">Số điện thoại:</span>${order.phoneNumber}</td>
   <td><span class="res-head">Địa chỉ:</span>${order.address}</td>
   <td><span class="res-head"> Ngày đặt hàng:</span>${formatDate(
     order.order_date
   )}</td>
   <td>${order.order_items.reduce(
    (total, product) => total + (product.quantityInCart * product.price),
    0
  ).toLocaleString('de-DE')}₫</td>

   <td class="action">
   <a href='../../orderDetail.html?order_id=${
     order.id
   }' style='color:blue'>Xem chi tiết</a>
 </td>
   
 </tr>`
  );
  list_order.innerHTML = renderListOrder.join("");
}

async function checkUserLogin() {
  if (!current_user) {
    window.location = "http://127.0.0.1:5500";
    alert('Vui lòng đăng nhập để xem đơn hàng của bạn')
  }

}
checkUserLogin();

document.addEventListener("DOMContentLoaded", (e) => {
  displayListOrder();
});
