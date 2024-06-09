if (!user) {
  alert("You need to login or sign up first");
}

MountComponent();

async function MountComponent() {
  try {
    const response = await axios.get(`http://localhost:3000/user/${user._id}`);
    if (response.status !== 200) {
      throw new Error("Have a problem in fetching orders");
    }
    const orders = response.data.reverse();
    const orderContainer = document.querySelector(".order-container");
    const ordersHTML = RenderOrders(orders);
    orderContainer.innerHTML = `${orderContainer.innerHTML} ${ordersHTML}`;
    const totalorder = document.getElementById("total-order");
  } catch (e) {
    alert(e.message);
  }
}

function RenderOrders(orders) {
  let ordersHTML = "";
  orders.forEach((order) => {
    const itemsHTML = RenderItems(order.items);
    ordersHTML += `    <div class="order">
      <h4>OrderID: ${order._id}</h4>
      <h4>Name: ${order.name}</h4>
      <h4>Phone: ${order.phone}</h4>
      <h4>Address: ${order.address}</h4>
      ${itemsHTML}
      <h4 style="float:right" class="me-3 pb-3">Total: ${formatCurrency(
        order.total
      )}</h4>
    </div>`;
  });
  return ordersHTML;
}

function RenderItems(items) {
  let itemsHTML = "";
  items.forEach((item) => {
    itemsHTML += `      <div class="order-items">
        <div
          class="order-item d-flex justify-content-between align-items-center mb-3"
        >
          <div class="d-flex align-items-center">
            <img src="${item.product.image}" alt="Hình minh họa" />
            <div class="product-title-price">
              <h2>${item.product.name}</h2>
              <p>${formatCurrency(item.product.salePrice)}</p>
            </div>
          </div>
          <div class="d-flex align-items-center">
            <input
              type="number"
              name="quantity"
              min="1"
              value="${item.quantity}"
              max="50"
              class="form-control"
              disabled
            />
          </div>
        </div>
        <!-- Repeat for more items if needed -->
      </div>`;
  });
  return itemsHTML;
}
