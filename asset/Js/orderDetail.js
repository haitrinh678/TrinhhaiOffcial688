function formatDate(timestamp) {
   const date = new Date(timestamp * 1000);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes} ${day}/${month}/${year}`;
 }
 

async function displayListOrder() {
  let list_orderDetail = document.querySelector(".list_orderDetail");
  const urlParams = new URLSearchParams(window.location.search);
  const order_id = urlParams.get('order_id');
  const {data:getListOrder} = await axios.get(`http://localhost:3000/orders/${order_id}`);
  // const dataOrderDetail=getListOrder.data.filter(item=>item.id==order_id)

  const renderListOrder = getListOrder.order_items.map(
    (order) => `<tr>
   <td>${order_id}</td>
   <td>${order.name}</td>
   <td>Số Lượng: ${order.quantityInCart}</td>
   <td>${Number(order.price).toLocaleString('de-DE')} ₫</td>
   <td><img style='height:200px ; width:200px;' src='${order.image}'/></td>
 </td>
   
 </tr>`
  );
  
  list_orderDetail.innerHTML = renderListOrder.join("");
}
const current_user = localStorage.getItem("current_user")
? JSON.parse(localStorage.getItem("current_user"))
: null;
async function checkUserLogin() {
  if (!current_user) {
    window.location = "../../index.html";
  }
}
document.addEventListener("DOMContentLoaded", (e) => {
  checkUserLogin()
  displayListOrder();
});
