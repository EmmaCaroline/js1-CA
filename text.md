
// CREATING A CART - NEW:

<!-- Product Page 1 -->
<div>
  <h2>Product 1</h2>
  <p>Price: $10</p>
  <button class="add-to-cart" data-product-id="1">Add to Cart</button>
</div>

<!-- Product Page 2 -->
<div>
  <h2>Product 2</h2>
  <p>Price: $15</p>
  <button class="add-to-cart" data-product-id="2">Add to Cart</button>
</div>

<!-- Product Page 3 -->
<div>
  <h2>Product 3</h2>
  <p>Price: $20</p>
  <button class="add-to-cart" data-product-id="3">Add to Cart</button>
</div>
HTML for checkout page:

html
Copy code
<!-- Checkout Page -->
<div>
  <h2>Checkout</h2>
  <ul id="cart-items"></ul>
  <p>Total: $<span id="total-price">0</span></p>
</div>
JavaScript:

javascript
Copy code
// Function to handle adding a product to the cart
function addToCart(productId) {
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }
  updateCart();
}

// Function to handle removing a product from the cart
function removeFromCart(productId) {
  const index = cart.findIndex(item => item.id === productId);
  if (index !== -1) {
    cart.splice(index, 1);
  }
  updateCart();
}

// Function to handle clearing the cart
function clearCart() {
  cart = [];
  updateCart();
}

// Function to update the cart UI
function updateCart() {
  const cartItemsElement = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');
  let totalPrice = 0;

  cartItemsElement.innerHTML = '';
  cart.forEach(item => {
    const product = products.find(product => product.id === item.id);
    if (product) {
      const listItem = document.createElement('li');
      listItem.textContent = `${product.name} x ${item.quantity}`;
      cartItemsElement.appendChild(listItem);
      totalPrice += product.price * item.quantity;
    }
  });

  totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Sample data for products
const products = [
  { id: 1, name: 'Product 1', price: 10 },
  { id: 2, name: 'Product 2', price: 15 },
  { id: 3, name: 'Product 3', price: 20 }
];

// Initialize an empty cart
let cart = [];

// Event listener for add to cart buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productId = parseInt(button.dataset.productId);
    addToCart(productId);
  });
});
This code sets up a basic shopping cart functionality. You would need to integrate this code with your existing website structure and styling. The addToCartButtons variable selects all buttons with the class add-to-cart, which you should add to your product pages. When a button is clicked, it calls the addToCart function with the corresponding product ID. The updateCart function is responsible for updating the cart UI on the checkout page.





// Creating a cart:

// Global cart variable
let cart = [];

// Function to add a jacket to the cart
function addToCart(jacket, size, quantity = 1) {
    const index = cart.findIndex(item => item.jacket.id === jacket.id && item.size === size);
    if (index !== -1) {
        cart[index].quantity += quantity;
    } else {
        cart.push({ jacket: jacket, size: size, quantity: quantity });
    }
}

// Function to remove a jacket from the cart
function removeFromCart(jacket, size) {
    const index = cart.findIndex(item => item.jacket.id === jacket.id && item.size === size);
    if (index !== -1) {
        cart.splice(index, 1);
    }
}

// Function to clear the cart
function clearCart() {
    cart = [];
}

// Function to calculate the total cost of the cart
function getCartTotalCost() {
    return cart.reduce((total, item) => total + (item.jacket.price * item.quantity), 0);
}

// Function to checkout the cart
function checkoutCart() {
    const totalCost = getCartTotalCost();
    console.log(`Your order has been placed. Total amount: NOK ${totalCost}`);
    clearCart();
}

// Example usage
addToCart(jacket1, 'M');
addToCart(jacket2, 'L', 2);
removeFromCart(jacket1, 'M');
console.log(getCartTotalCost());
checkoutCart();



// Connecting to cart-icon:

function openCartModal() {
    const cartModal = document.getElementById("cartModal");
    cartModal.innerHTML = ""; // Clear the modal content
    if (cart.length === 0) {
        cartModal.textContent = "Your cart is empty.";
    } else {
        cart.forEach(item => {
            const cartItemElement = document.createElement("div");
            cartItemElement.textContent = `${item.jacket.title} - Size: ${item.size}, Quantity: ${item.quantity}`;
            cartModal.appendChild(cartItemElement);
        });
    }
    // Display the cart modal
    cartModal.style.display = "block";
}

// Function to close the cart modal
function closeCartModal() {
    const cartModal = document.getElementById("cartModal");
    cartModal.style.display = "none";
}

// Event listener for the cart icon
const cartIcon = document.getElementById("cartIcon");
cartIcon.addEventListener("click", () => {
    openCartModal();
});

// Example usage
addToCart(jacket1, 'M');
addToCart(jacket2, 'L', 2);

// Close cart modal when clicking outside of it
window.addEventListener("click", (event) => {
    const cartModal = document.getElementById("cartModal");
    if (event.target === cartModal) {
        closeCartModal();
    }
});