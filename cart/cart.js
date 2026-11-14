const STORAGE_KEY = "week7-shopping-cart";

const state = {
  products: [
    { id: 1, name: "Mandazi (pack of 6)", price: 120 },
    { id: 2, name: "Chapati (pack of 5)", price: 150 },
    { id: 3, name: "Tea leaves 250g", price: 180 },
  ],
  cart: [], // { productId, quantity } — only the cart is saved; products are fixed
};

const productsList = document.querySelector("#products");
const cartList = document.querySelector("#cart-items");
const totalElement = document.querySelector("#total");
const emptyMessage = document.querySelector("#empty-message");
const clearCartButton = document.querySelector("#clear-cart");
const statusElement = document.querySelector("#cart-status");

function loadCart() {
  try {
    const savedCart = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");

    if (!Array.isArray(savedCart)) return [];

    return savedCart.filter((item) => {
      const productExists = state.products.some(
        (product) => product.id === item.productId,
      );

      return (
        productExists &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0
      );
    });
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

function saveCart() {
  try {
    // Save only product IDs and quantities, never the fixed product catalogue.
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
  } catch {
    statusElement.textContent = "Your cart could not be saved in this browser.";
  }
}

function formatPrice(amount) {
  return `KSh ${amount.toFixed(2)}`;
}

function createButton(label, className, onClick, accessibleLabel = label) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.className = className;
  button.setAttribute("aria-label", accessibleLabel);
  button.addEventListener("click", onClick);
  return button;
}

function addToCart(productId) {
  const product = state.products.find((item) => item.id === productId);
  if (!product) return;

  const existing = state.cart.find((item) => item.productId === productId);

  if (existing) {
    existing.quantity++;
  } else {
    state.cart.push({ productId, quantity: 1 });
  }

  saveCart();
  renderCart();
  statusElement.textContent = `${product.name} added to your cart.`;
}

function updateQuantity(productId, quantity) {
  if (!Number.isInteger(quantity) || quantity < 0) return;

  if (quantity === 0) {
    removeFromCart(productId);
    return;
  }

  const item = state.cart.find((entry) => entry.productId === productId);
  if (!item) return;

  item.quantity = quantity;
  saveCart();
  renderCart();
  statusElement.textContent = "Cart quantity updated.";
}

function removeFromCart(productId) {
  state.cart = state.cart.filter((item) => item.productId !== productId);
  saveCart();
  renderCart();
  statusElement.textContent = "Product removed from your cart.";
}

function getCartTotal() {
  return state.cart.reduce((total, item) => {
    const product = state.products.find((p) => p.id === item.productId);
    return product ? total + product.price * item.quantity : total;
  }, 0);
}

function getCartCount() {
  return state.cart.reduce((count, item) => count + item.quantity, 0);
}

function renderProducts() {
  productsList.replaceChildren();

  state.products.forEach((product) => {
    const item = document.createElement("li");
    item.className = "item-row";

    const details = document.createElement("div");
    const name = document.createElement("span");
    const price = document.createElement("p");

    name.className = "item-name";
    name.textContent = product.name;
    price.className = "item-price";
    price.textContent = formatPrice(product.price);
    details.append(name, price);

    const addButton = createButton("Add to cart", "", () =>
      addToCart(product.id),
    );

    item.append(details, addButton);
    productsList.append(item);
  });
}

function renderCart() {
  cartList.replaceChildren();
  emptyMessage.hidden = state.cart.length > 0;
  clearCartButton.disabled = state.cart.length === 0;

  state.cart.forEach((cartItem) => {
    const product = state.products.find(
      (item) => item.id === cartItem.productId,
    );
    if (!product) return;

    const row = document.createElement("li");
    row.className = "item-row";

    const details = document.createElement("div");
    const name = document.createElement("span");
    const subtotal = document.createElement("p");

    name.className = "item-name";
    name.textContent = product.name;
    subtotal.className = "item-subtotal";
    subtotal.textContent = `${formatPrice(product.price)} each · Subtotal: ${formatPrice(product.price * cartItem.quantity)}`;
    details.append(name, subtotal);

    const actions = document.createElement("div");
    actions.className = "item-actions";

    actions.append(
      createButton(
        "−",
        "button-small button-secondary",
        () => updateQuantity(product.id, cartItem.quantity - 1),
        `Decrease ${product.name} quantity`,
      ),
    );

    const quantity = document.createElement("span");
    quantity.className = "quantity";
    quantity.textContent = String(cartItem.quantity);
    quantity.setAttribute("aria-label", `Quantity: ${cartItem.quantity}`);

    actions.append(
      quantity,
      createButton(
        "+",
        "button-small",
        () => updateQuantity(product.id, cartItem.quantity + 1),
        `Increase ${product.name} quantity`,
      ),
      createButton(
        "Remove",
        "button-danger",
        () => removeFromCart(product.id),
        `Remove ${product.name} from cart`,
      ),
    );

    row.append(details, actions);
    cartList.append(row);
  });

  totalElement.textContent = `Total: ${formatPrice(getCartTotal())} · Items: ${getCartCount()}`;
}

function clearCart() {
  if (state.cart.length === 0) return;

  state.cart = [];
  saveCart();
  renderCart();
  statusElement.textContent = "Your cart has been cleared.";
}

state.cart = loadCart();
clearCartButton.addEventListener("click", clearCart);

renderProducts();
renderCart();
