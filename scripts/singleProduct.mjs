
import { API_JACKETS_URL } from "./utils/constants.mjs";
import { doFetch } from "./utils/doFetch.mjs";

function createCart() {
    const cart = localStorage.getItem("cart");
    if (!cart) {
        localStorage.setItem("cart", JSON.stringify([]));
        return []; 
    }
    return JSON.parse(cart); 
}

async function generateJacketHtml(jacket) {
    const jacketContainer = document.createElement("div");
    jacketContainer.classList.add("jacket-container");

    const heading = document.createElement("h3");
    heading.textContent = jacket.title;

    const productImageContainer = document.createElement("div");
    productImageContainer.classList.add("productImage-container");
    const jacketImage = document.createElement("img");
    jacketImage.src = jacket.image.url;

    productImageContainer.appendChild(jacketImage);

    const jacketDescription = document.createElement("div");
    jacketDescription.textContent = jacket.description;
    jacketDescription.classList.add("jacket-description");

    const jacketColor = document.createElement("div");
    jacketColor.textContent = "Color: " + jacket.baseColor;
    jacketColor.classList.add("jacket-color");

    const jacketPriceContainer = document.createElement("div");
    jacketPriceContainer.classList.add("jacket-price-container");

    const jacketPrice = document.createElement("div");
    jacketPrice.textContent = "$ " + jacket.price;

    if (jacket.onSale !== false) {
        const jacketDiscountedPrice = document.createElement("div");
        jacketDiscountedPrice.textContent = "$ " + jacket.discountedPrice;
        jacketDiscountedPrice.style.color = "red";
        jacketPriceContainer.appendChild(jacketDiscountedPrice);
    } else {
        jacketPriceContainer.appendChild(jacketPrice);
    }
    
    const sizeDropdownContainer = document.createElement("div");

    const sizeDropdown = document.createElement("select");
    sizeDropdown.classList.add("size-dropdown");

    sizeDropdownContainer.appendChild(sizeDropdown);

    jacket.sizes.forEach(size => {
        const option = document.createElement("option");
        option.value = size;
        option.textContent = size;
        sizeDropdown.appendChild(option);
    });

    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.addEventListener("click", () => {
        const selectedSize = sizeDropdown.value; 
        addToCart(jacket, selectedSize); 
    });

    jacketContainer.append(heading, productImageContainer, jacketDescription, jacketColor, jacketPriceContainer, sizeDropdownContainer, addToCartButton);

    return jacketContainer;
}

function getCartCount() {
    const count = localStorage.getItem("cartCount");
    return count ? parseInt(count) : 0;
}

export function updateCartCount(count) {
    localStorage.setItem("cartCount", count.toString());
}

export function updateCartIcon() {
    const cartCount = getCartCount();
    const cartIcon = document.getElementById("cartIcon");
    if (cartCount > 0) {
        cartIcon.innerHTML = `<a href="../checkout/index.html">shopping_basket</a><span class="cart-count">${cartCount}</span>`;
    } else {
        cartIcon.innerHTML = `<a href="../checkout/index.html">shopping_basket</a>`;
    }
}

function showPopup(message) {
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.textContent = message;
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.remove();
    }, 3000);
}

function addToCart(jacket, selectedSize) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const itemIndex = cart.findIndex(currentJacket => jacket.id === currentJacket.id);
    if (itemIndex === -1) {
        cart.push({ ...jacket, quantity: 1, selectedSize: selectedSize }); 
    } else {
        cart[itemIndex].quantity++;
        cart[itemIndex].selectedSize = selectedSize; 
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount(cart.length);
    updateCartIcon();
    showPopup("Product added to cart");
}

function removeFromCart(itemId) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const updatedCart = cart.filter(item => item.id !== itemId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateCartCount(updatedCart.length);
    updateCartIcon();
}

async function displayJacketDetails(jacketId) {
        const responseData = await doFetch(API_JACKETS_URL);
        const jackets = responseData.data;

        const jacket = jackets.find(jacket => jacket.id === jacketId);
        if (jacket) {
            const jacketHtml = await generateJacketHtml(jacket);
            const displayContainer = document.getElementById("single-product-wrapper");
            displayContainer.textContent = "";
            displayContainer.appendChild(jacketHtml);
        }
}

async function main() {
    const urlParams = new URLSearchParams(window.location.search);
    const jacketId = urlParams.get('id');
    createCart();
    displayJacketDetails(jacketId);
    removeFromCart();
}

main();