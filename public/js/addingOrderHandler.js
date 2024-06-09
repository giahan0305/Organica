if (!user) {
  alert("You need to login or signup before you buy something in my shop");
}
MountComponent();
async function MountComponent() {
  try {
    const response = await axios.get(`http://localhost:3000/cart/${user._id}`);
    if (response.status != 200) {
      throw new Error("Have a problem in fetching cart");
    }
    const items = response.data.cartItems;
    const orderContainer = document.getElementById("order-items");
    orderContainer.innerHTML = rednerOrderItem(items);
    const total = document.getElementById("total-order");
    total.innerHTML = formatCurrency(
      items.reduce((acc, item) => {
        acc += item.product.salePrice * item.quantity;
        return acc;
      }, 0)
    );
  } catch (e) {
    alert(e.message);
  }
}
function rednerOrderItem(items) {
  let orderItemsHTML = "";
  items.forEach((item) => {
    orderItemsHTML += `      
        <div 
        data-id-product=${item._id}
        class="product-item order-item d-flex justify-content-between align-items-center mb-3"
      >
        <div class="d-flex align-items-center" onclick="window.location.href='/products/${
          item.product._id
        }'">
          <img src="${item.product.image}" alt="Hình minh họa" />
          <div class="product-title-price">
            <h4>${item.product.name}</h4>
            <p>${formatCurrency(item.product.salePrice)}</p>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <input
            type="number"
            name="quantity"
            min="1"
            value="${item.quantity}"
            data-id-product=${item._id}
            max="50"
            onchange="changeQuantity(event)"
            class="form-control"
            style="width: 60px; text-align: center;"
          />
          <div data-id-product= ${item._id} onclick="deleteItem(event)">
          <ion-icon
            name="close"
            class="ms-3"
            style="cursor: pointer;"
          ></ion-icon>
          </div>
        </div>
      </div>`;
  });
  return orderItemsHTML;
}
const deliveryForm = document.querySelector(".form-delivery");
const nameInput = document.getElementById("inputName");
const phoneInput = document.getElementById("inputPhone");
const addressInput = document.getElementById("inputAddress");
const wardInput = document.getElementById("inputWard");
const cityInput = document.getElementById("inputCity");
deliveryForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = nameInput.value;
  const phone = phoneInput.value;
  const address = addressInput.value;
  const ward = wardInput.value;
  const city = cityInput.value;
  const combinedAddress = `${address}, ${ward}, ${city}`;
  // here
  const data = { name, phone, address: combinedAddress };

  try {
    const response = await axios.post(
      `http://localhost:3000/orders/${user._id}`,
      data
    );
    if (response.status === 200) {
      window.location.href = "/orders";
    }
  } catch (e) {
    alert(e.message);
  }
});
