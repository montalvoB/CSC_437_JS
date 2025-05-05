const PRODUCTS = [
  // Imagine this data came in via the server
  {
    name: "Elder Chocolate Truffles, 2oz",
    description: "The best of the best in chocolate truffles.",
    imageSrc: "https://placehold.co/200x200",
    price: 10,
    numInCart: 2,
  },
  {
    name: "Jelly Belly Jelly Beans, 100 count",
    description: "Not for planting.",
    imageSrc: "https://placehold.co/200x200",
    price: 5,
    numInCart: 1,
  },
  {
    name: "Kettle Chips, 8oz",
    description: "Delicious and unhealthy.",
    imageSrc: "https://placehold.co/200x200",
    price: 3,
    numInCart: 0,
  },
  {
    name: "Carrots, 2lb",
    description: "Delicious and healthy.",
    imageSrc: "https://placehold.co/200x200",
    price: 2,
    numInCart: 0,
  },
];

/**
 * Turns a product data object into HTML.
 *
 * @param product product data
 * @return {HTMLElement} HTML element representing the product data
 */
function renderProductCard(product) {
  const article = document.createElement("article");
  article.innerHTML = `
      <img src="${product.imageSrc}" alt="${product.name}" />
      <div class="product-details">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="price">$${product.price}</p>
        <div>
          <button class="buy-button">Add to cart</button>
          ${
            product.numInCart
              ? `<span class="num-in-cart">${product.numInCart} in cart</span>`
              : ""
          }
        </div>
      </div>
    `;
  return article;
}

/**
 * Recreates all product cards.
 */
function rerenderAllProducts() {
  /*
    1. remove all <article>s
    2. recreate them using the data in PRODUCTS
    3. modify the re-creation so it uses shouldProductBeVisible() (details are near the bottom of the lab directions)

    You can remove and recreate the heading element if it makes things easier.
     */
  const productList = document.querySelector(".product-list");
  productList.innerHTML = "<h2>Search results</h2>";

  for (let product of PRODUCTS) {
    if (!shouldProductBeVisible(product)) {
      continue;
    }
    const productCard = renderProductCard(product);
    productList.appendChild(productCard);
  }
}

/**
 * Recreates all cart panel info.
 */
function rerenderCart() {
  /*
    1. remove all card items
    2. recreate them and the remove buttons based off the data in PRODUCTS
     */
  const cart = document.querySelector(".cart");
  cart.innerHTML = "<h2>Cart</h2>";

  for (let product of PRODUCTS) {
    if (product.numInCart > 0) {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
                <p>${product.name} x${product.numInCart}</p>
                <button class="remove-button">Remove</button>
            `;
      cart.appendChild(cartItem);
    }
  }
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("buy-button")) {
    const productCard = e.target.closest("article");
    const productName = productCard.querySelector("h3").textContent;
    const product = PRODUCTS.find((p) => p.name === productName);
    if (product) {
      product.numInCart++;
      rerenderAllProducts();
      rerenderCart();
    }
  }
  if (e.target.classList.contains("remove-button")) {
    const cartItem = e.target.closest(".cart-item");
    const productName = cartItem.querySelector("p").textContent.split(" x")[0];
    const product = PRODUCTS.find((p) => p.name === productName);
    if (product) {
      product.numInCart--;
      rerenderAllProducts();
      rerenderCart();
    }
  }
});

const minPriceInput = document.querySelector("#minPrice");
const maxPriceInput = document.querySelector("#maxPrice");
/**
 * Returns whether a product should be visible based on the current values of the price filters.
 *
 * @param product product data
 * @return {boolean} whether a product should be visible
 */
function shouldProductBeVisible(product) {
  const minPrice = parseFloat(minPriceInput.value) || 0;
  const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

  return product.price >= minPrice && product.price <= maxPrice;
}

rerenderAllProducts();
rerenderCart();

document.addEventListener("change", (e) => {
  if (e.target.id === "minPrice" || e.target.id === "maxPrice") {
    rerenderAllProducts();
  }
});
