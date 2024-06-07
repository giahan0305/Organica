const buybtn = document.querySelector(".product-qty-btn");
const quantityInput = document.getElementById("quantity-input");
const url = window.location.href;
const components = url.split("/");
const productId = components[components.length - 1];
buybtn.addEventListener("click", async () => {
  const quantity = quantityInput.value;
  const userId = user ? user._id : undefined;
  if (!userId) {
    alert("you need to login!!!");
  } else {
    const response = await axios.post("http://localhost:3000/cart/add", {
      quantity,
      productId,
      userId,
    });
    if (response.status === 201) {
      window.location.reload();
    } else {
      console.log(response);
    }
  }
});
