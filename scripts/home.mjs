// Mantra 3.steps: 
// 1. Make it work
// 2. Make it right
// 3. Make it fast

// Display items from api
// 1. Get the data (check)
// 2. Loop through the data
// 3. Create HTML for the individual items
// 4. Append the HTML to the document

import { API_JACKETS_URL } from "./utils/constants.mjs";
import { doFetch } from "./utils/doFetch.mjs";


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

    const seeDetailsButton = document.createElement("button");
    seeDetailsButton.textContent = "See Details";
    seeDetailsButton.classList.add("see-details-button");

    seeDetailsButton.dataset.productId = jacket.id; // Assuming 'id' is the property containing the product ID

    if (jacket.onSale !== false) {
        const jacketDiscountedPrice = document.createElement("div");
        jacketDiscountedPrice.textContent = "ON SALE: $ " + jacket.discountedPrice;
        jacketDiscountedPrice.style.color = "red";
        jacketPriceContainer.appendChild(jacketDiscountedPrice);
    } else {
        jacketPriceContainer.appendChild(jacketPrice);
    }

    
    jacketContainer.append(heading, jacketImage, jacketPriceContainer, seeDetailsButton);
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

    const seeDetailsButtons = document.querySelectorAll('.see-details-button');
    seeDetailsButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            console.log('Clicked button with product ID:', productId);
            displaySingleJacket(productId);
        });
    });
}

main();
