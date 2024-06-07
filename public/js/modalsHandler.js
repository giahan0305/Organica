document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("pwd").value;

    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, pswd: password }),
    });

    const result = await response.json();

    if (response.ok) {
      // Assuming the server response includes user information or a token
      localStorage.setItem("user", JSON.stringify(result));
      window.location.reload();
    } else {
      alert("Login failed: " + result.message);
    }
  });
window.onload = function () {
  const existedUser = JSON.parse(localStorage.getItem("user"));
  if (existedUser) {
    const rowPerson = document.querySelector(".row-person");
    rowPerson.innerHTML = existedUser.user.name;
    const logoutBtn = document.createElement("button");
    logoutBtn.innerHTML = "Đăng xuất";
    logoutBtn.className = "btn logout-btn";
    logoutBtn.onclick = logout;
    rowPerson.appendChild(logoutBtn);
  }
};
function logout() {
  localStorage.removeItem("user");
  window.location.reload();
}
//
function ShowButtonClick(index) {
  var btns = document.getElementsByClassName("filter-btn");
  var grids = document.getElementsByClassName("list");
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove("active");
    grids[i].classList.remove("active");
  }
  document.getElementById("filter-btn" + index).classList.add("active");
  document.getElementById("list" + index).classList.add("active");
}
let user = JSON.parse(localStorage.getItem("user"));
user = user ? user.user : undefined;
async function fetchData() {
  if (user) {
    try {
      const response = await axios.get(
        `http://localhost:3000/cart/${user._id}`
      );
      const panelList = document.querySelector(".panel-list-cart");
      const cartBadge = document.getElementById("cart-badge");
      const items = response.data.cartItems;
      const total = document.getElementById("total");
      total.innerHTML = formatCurrency(
        items.reduce((acc, item) => {
          acc += item.product.salePrice * item.quantity;
          return acc;
        }, 0)
      );
      const length = items.length;
      cartBadge.value = length;
      cartBadge.innerHTML = length < 10 ? `0${length}` : length;
      panelList.innerHTML = itemPanelRender(items);
    } catch (e) {
      console.log(e);
    }
  }
}
fetchData();

function itemPanelRender(items) {
  let itemsHTML = "";
  items.forEach((item) => {
    itemsHTML += `<li  data-id-product=${
      item._id
    } class="panel-item product-item" >
    <div class="panel-card">
      <div  onclick="window.location.href='/products/${
        item.product._id
      }'"  style="display:flex;">
        <figure class="item-banner">
          <img
            src="${item.product.image}"
            width="46"
            height="46"
            loading="lazy"
            alt="Bright Side Vegetarian"
          />
        </figure>
        <div class="ms-3">
          <p class="item-title">${item.product.name}</p>
          <span class="item-value">${formatCurrency(
            item.product.salePrice
          )}</span>
        </div>
      </div>
      <div class="d-flex" style="font-size:18px">
      <input type="number"
        name="quantity" class="input-group-text product-qty-input me-3" data-id-product=${
          item._id
        } onchange="changeQuantity(event)" min="1" value=${item.quantity}
        max="50" />
        <div onclick="deleteItem(event)"  data-id-product=${item._id} >
        <ion-icon  name="close" class="pt-3 pe-3 "></ion-icon></div>
      </div>
    </div>
  </li>`;
  });
  return itemsHTML;
}

function formatCurrency(amount) {
  // Convert the number to a string and format it with commas as thousands separators
  let formattedAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Add the Vietnamese currency symbol "₫" at the end
  formattedAmount += " ₫";

  return formattedAmount;
}

async function changeQuantity(event) {
  event.stopPropagation();
  const quantity = event.target.value;
  const idCard = event.target.getAttribute("data-id-product");
  try {
    const response = await axios.put(`http://localhost:3000/cart/${idCard}`, {
      quantity,
    });
    if (response.status != 200) {
      throw new Error("Have problem in changing quantity ");
    }
  } catch (e) {
    alert(e.message);
  }
}
async function deleteItem(event) {
  const idProduct = event.target.getAttribute("data-id-product");
  try {
    const response = await axios.delete(
      `http://localhost:3000/cart/${idProduct}`
    );
    if (response.status === 200) {
      const deletedCards = document.querySelectorAll(
        `.product-item[data-id-product="${idProduct}"]`
      );
      deletedCards.forEach((deletedCard) => {
        deletedCard.remove();
      });
      decreaseCartBadge();
    } else {
      throw new Error("Problem in deleting product");
    }
  } catch (e) {
    alert(e.message);
  }
}

function decreaseCartBadge() {
  const cartBadge = document.getElementById("cart-badge");
  let currentValue = parseInt(cartBadge.getAttribute("value"), 10);
  if (currentValue > 0) {
    currentValue -= 1;
    cartBadge.setAttribute("value", currentValue);

    // Update the displayed value with leading zeros
    const displayedValue =
      currentValue < 10 ? `0${currentValue}` : currentValue;
    cartBadge.textContent = displayedValue;
  }
}
