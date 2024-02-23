
import { API_JACKETS_URL } from "./utils/constants.mjs";
import { doFetch } from "./utils/doFetch.mjs";
import { updateCartCount } from './singleProduct.mjs';
/*import { updateCartIcon } from './singleProduct.mjs';*/

function generateJacketHtml(jacket) {

    const jacketContainer = document.createElement("div");
    jacketContainer.classList.add("jacket-container");

    const heading = document.createElement("h3");
    heading.textContent = jacket.title;

    const jacketImage = document.createElement("img");
    jacketImage.src = jacket.image.url;
    jacketImage.addEventListener('click', function() {
        window.location.href = `product/index.html?id=${jacket.id}`;
    });

    const jacketPriceContainer = document.createElement("div");
    jacketPriceContainer.classList.add("jacket-price-container");

    const jacketPrice = document.createElement("div");
    jacketPrice.textContent = "$ " + jacket.price;

    if (jacket.onSale !== false) {
        const jacketDiscountedPrice = document.createElement("div");
        jacketDiscountedPrice.textContent = "ON SALE: $ " + jacket.discountedPrice;
        jacketDiscountedPrice.style.color = "red";
        jacketPriceContainer.appendChild(jacketDiscountedPrice);
    } else {
        jacketPriceContainer.appendChild(jacketPrice);
    }

    const seeDetailsButton = document.createElement("button");
    seeDetailsButton.textContent = "See Details";
    seeDetailsButton.addEventListener('click', function() {
        window.location.href = `product/index.html?id=${jacket.id}`;
    });
     
    jacketContainer.append(heading, jacketImage, jacketPriceContainer, seeDetailsButton);
    
    return jacketContainer;
}

async function displayJackets(jackets) {
    const displayContainer = document.querySelector(".jacket-wrapper");
    displayContainer.textContent = "";
    jackets.forEach(async (jacket) => {
        const jacketHtml = await generateJacketHtml(jacket);
        console.log(jacket);
        displayContainer.appendChild(jacketHtml);
    });
}

async function main() {
    try {
        const responseData = await doFetch(API_JACKETS_URL);
        const jackets = responseData.data;
        displayJackets(jackets);
    } catch (error) {
        console.log(error);
    }
}

main();
