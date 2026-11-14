// Fixed products from the course exercise. Only cart quantities are stored.
const PRODUCTS = [
  { id: 1, name: "Mandazi (pack of 6)", price: 120 },
  { id: 2, name: "Chapati (pack of 5)", price: 150 },
  { id: 3, name: "Tea leaves 250g", price: 180 },
];

const STORAGE_KEY = "week7-shopping-cart";

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

    return savedCart
      .filter((item) => {
        const product = PRODUCTS.find((candidate) => candidate.id === item.id);
        return product && Number.isInteger(item.quantity) && item.quantity > 0;
      })
      .map((item) => {
        const product = PRODUCTS.find((candidate) => candidate.id === item.id);
        return { ...product, quantity: item.quantity };
      });
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

let cart = loadCart();

function saveCart() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(cart.map(({ id, quantity }) => ({ id, quantity }))),
    );
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

function renderProducts() {
  productsList.replaceChildren();

  PRODUCTS.forEach((product) => {
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

    const addButton = createButton("Add to cart", "", () => addToCart(product.id));
    item.append(details, addButton);
    productsList.append(item);
  });
}

function addToCart(productId) {
  const product = PRODUCTS.find((item) => item.id === productId);
  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  renderCart();
  statusElement.textContent = `${product.name} added to your cart.`;
}

function changeQuantity(productId, change) {
  const item = cart.find((cartItem) => cartItem.id === productId);
  if (!item) return;

  item.quantity += change;
  if (item.quantity <= 0) {
    cart = cart.filter((cartItem) => cartItem.id !== productId);
  }

  saveCart();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  renderCart();
  statusElement.textContent = "Product removed from your cart.";
}

function clearCart() {
  if (cart.length === 0) return;
  cart = [];
  saveCart();
  renderCart();
  statusElement.textContent = "Your cart has been cleared.";
}

function renderCart() {
  cartList.replaceChildren();
  emptyMessage.hidden = cart.length > 0;
  clearCartButton.disabled = cart.length === 0;

  cart.forEach((item) => {
    const row = document.createElement("li");
    row.className = "item-row";

    const details = document.createElement("div");
    const name = document.createElement("span");
    const subtotal = document.createElement("p");
    name.className = "item-name";
    name.textContent = item.name;
    subtotal.className = "item-subtotal";
    subtotal.textContent = `${formatPrice(item.price)} each · Subtotal: ${formatPrice(item.price * item.quantity)}`;
    details.append(name, subtotal);

    const actions = document.createElement("div");
    actions.className = "item-actions";
    actions.append(
      createButton("−", "button-small button-secondary", () => changeQuantity(item.id, -1), `Decrease ${item.name} quantity`),
    );

    const quantity = document.createElement("span");
    quantity.className = "quantity";
    quantity.textContent = String(item.quantity);
    quantity.setAttribute("aria-label", `Quantity: ${item.quantity}`);

    actions.append(
      quantity,
      createButton("+", "button-small", () => changeQuantity(item.id, 1), `Increase ${item.name} quantity`),
      createButton("Remove", "button-danger", () => removeFromCart(item.id), `Remove ${item.name} from cart`),
    );

    row.append(details, actions);
    cartList.append(row);
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalElement.textContent = `Total: ${formatPrice(total)}`;
}

clearCartButton.addEventListener("click", clearCart);

renderProducts();
renderCart();
