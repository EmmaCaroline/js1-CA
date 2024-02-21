
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