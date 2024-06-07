document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-query");
  document.getElementById("search-form").addEventListener("submit", (e) => {
    event.preventDefault();
    const searchValue = searchInput.value;
    window.location.href = `http://localhost:3000/products/search?q=${searchValue}`;
  });
});
