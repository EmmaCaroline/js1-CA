// Mantra 3.steps: 
// 1. Make it work
// 2. Make it right
// 3. Make it fast

// Display items from api
// 1. Get the data (check)
// 2. Loop through the data
// 3. Create HTML for the individual items
// 4. Append the HTML to the document

// Change everything to rainydays instead of gamehub

import { API_JACKETS_URL } from "./constants.mjs";
import { doFetch } from "./utils/doFetch.mjs";

/*
<div class="jacket-wrapper"> 
    <div class="jacket-container">
        <!-- classes under will be created in js, just showing to know the divs -->
        <h3>Rainy Days Thunderbolt Jacket</h3>
        <img src="">
        <div class="jacket-price-container">
            <div>Price: 139.99</div>
            <div>Discounted Price: 139.99</div>
        </div>
        <div class = "jacket-size-container">
    </div>
</div>
*/


function generateJacketHtml(jacket) {
    //return jacket HTML
    const jacketWrapper = document.createElement("div");
    jacketWrapper.classList.add("jacket-wrapper");

    const jacketContainer = document.createElement("div");
    jacketContainer.classList.add("jacket-container");

    const heading = document.createElement("h3");
    heading.textContent = jacket.title;

    const jacketImage = document.createElement("img");
    jacketImage.src = jacket.image.url;

    const jacketPriceContainer = document.createElement("div");
    jacketPriceContainer.classList.add("jacket-price-container");

    const jacketPrice = document.createElement("div");
    jacketPrice.textContent = "$ " + jacket.price;

    const jacketSizesContainer = document.createElement("div");
    jacketSizesContainer.classList.add("jacket-size-container");
    
    const sizeDropdown = document.createElement("select");
    sizeDropdown.classList.add("size-dropdown");

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
        // Add logic to add selected size to cart
        console.log("Selected size:", selectedSize);
    });

    if (jacket.onSale !== false) {
        const jacketDiscountedPrice = document.createElement("div");
        jacketDiscountedPrice.textContent = "ON SALE: $ " + jacket.discountedPrice;
        jacketDiscountedPrice.style.color = "red";
        jacketPriceContainer.appendChild(jacketDiscountedPrice);
    } else {
        jacketPriceContainer.appendChild(jacketPrice);
    }

    const jacketLink = document.createElement("a");
    jacketLink.textContent = "View Details";

    jacketSizesContainer.appendChild(sizeDropdown);
    
    jacketContainer.append(heading, jacketImage, jacketPriceContainer, jacketSizesContainer, addToCartButton);
    jacketWrapper.appendChild(jacketContainer);
    
    return jacketContainer;
}

async function displayJackets(jackets) {
    const displayContainer = document.querySelector(".jacket-wrapper");
    jackets.forEach((jacket) => {
        const jacketHtml = generateJacketHtml(jacket);
        console.log(jacket);
        displayContainer.appendChild(jacketHtml);
    });
}

async function main() {
    const responseData = await doFetch(API_JACKETS_URL);
    const jackets = responseData.data;
    displayJackets(jackets);
}

main();
