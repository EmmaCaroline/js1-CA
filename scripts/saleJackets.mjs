
import { API_JACKETS_URL } from "./utils/constants.mjs";
import { doFetch } from "./utils/doFetch.mjs";
import { updateCartCount } from './singleProduct.mjs';
import { updateCartIcon } from './singleProduct.mjs';

function generateJacketHtml(jacketSale) {

    const jacketSaleContainer = document.createElement("div");
    jacketSaleContainer.classList.add("jacket-sale-container");

    const heading = document.createElement("h3");
    heading.textContent = jacketSale.title;

    const jacketImage = document.createElement("img");
    jacketImage.src = jacketSale.image.url;
    jacketImage.addEventListener('click', function() {
        window.location.href = `../product/index.html?id=${jacketSale.id}`;
    });

    const jacketPriceContainer = document.createElement("div");
    jacketPriceContainer.classList.add("jacket-sale-price-container");

    const jacketPrice = document.createElement("div");
    jacketPrice.textContent = "$ " + jacketSale.price;

    const seeDetailsButton = document.createElement("button");
    seeDetailsButton.textContent = "See Details";
    seeDetailsButton.addEventListener('click', function() {
        window.location.href = `../product/index.html?id=${jacketSale.id}`;
    });

    if (jacketSale.onSale !== false) {
        const jacketDiscountedPrice = document.createElement("div");
        jacketDiscountedPrice.textContent = "ON SALE: $ " + jacketSale.discountedPrice;
        jacketDiscountedPrice.style.color = "red";
        jacketPriceContainer.appendChild(jacketDiscountedPrice);
    } else {
        jacketPriceContainer.appendChild(jacketPrice);
    }
    
    jacketSaleContainer.append(heading, jacketImage, jacketPriceContainer, seeDetailsButton);
    
    return jacketSaleContainer;
}

async function displayJackets(jacketsSale) {
    const displayContainer = document.querySelector(".jacket-sale-wrapper");
    jacketsSale.forEach((jacketSale) => {
        const jacketHtml = generateJacketHtml(jacketSale);
        displayContainer.appendChild(jacketHtml);
    });
}

async function main() {
    const responseData = await doFetch(API_JACKETS_URL);
    const jacketsSale = responseData.data.filter(jacketSale => jacketSale.onSale === true); 
    displayJackets(jacketsSale); 
}

main();