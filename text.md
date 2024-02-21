// Add product to genre pages:

Here's how you might go about it:

Create separate HTML pages for each gender and sale status (e.g., female_page.html, male_page.html, sale_page.html).
In each of these HTML pages, include a container element where you want the jackets to be displayed (e.g., a <div> element with a specific ID).
Modify your JavaScript code to append the generated jacket HTML elements to the appropriate container on each HTML page.
For example, let's say you have a container <div> element with the ID "female-jackets-container" on your female_page.html:

html
Copy code
<div id="female-jackets-container"></div>
Then, in your JavaScript code for female_page.html, you would do something like this:

javascript
Copy code
async function main() {
    const responseData = await doFetch(API_JACKETS_URL);
    const jackets = responseData.data.filter(jacket => jacket.gender === "female");
    const displayContainer = document.getElementById("female-jackets-container");
    displayJackets(jackets, displayContainer);
}

main();
Similarly, you would have similar logic for male_page.html and sale_page.html where you filter jackets based on gender and sale status (for sale page: filter(jacket => jacket.onSale === true); ) and append them to their respective container elements.

Remember to adjust the logic and HTML structure according to your specific requirements and page setup.







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