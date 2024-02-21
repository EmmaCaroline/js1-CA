

import { API_JACKETS_URL } from "./utils/constants.mjs";
import { doFetch } from "./utils/doFetch.mjs";

function generateJacketHtml(jacketSale) {
    //return jacket HTML
    const jacketSaleWrapper = document.createElement("div");
    jacketSaleWrapper.classList.add("jacket-sale-wrapper");

    const jacketSaleContainer = document.createElement("div");
    jacketSaleContainer.classList.add("jacket-sale-container");

    const heading = document.createElement("h3");
    heading.textContent = jacketSale.title;

    const jacketImage = document.createElement("img");
    jacketImage.src = jacketSale.image.url;

    const jacketPriceContainer = document.createElement("div");
    jacketPriceContainer.classList.add("jacket-sale-price-container");

    const jacketPrice = document.createElement("div");
    jacketPrice.textContent = "$ " + jacketSale.price;

    /*const jacketSizesContainer = document.createElement("div");
    jacketSizesContainer.classList.add("jacket-size-container");
    
    const sizeDropdown = document.createElement("select");
    sizeDropdown.classList.add("size-dropdown");

    jacketSale.sizes.forEach(size => {
        const option = document.createElement("option");
        option.value = size;
        option.textContent = size;
        sizeDropdown.appendChild(option);
    });*/

    const seeDetailsButton = document.createElement("button");
    seeDetailsButton.textContent = "See Details";
    /*addToCartButton.addEventListener("click", () => {
        const selectedSize = sizeDropdown.value;
        // Add logic to add selected size to cart
        console.log("Selected size:", selectedSize);
    });*/

    if (jacketSale.onSale !== false) {
        const jacketDiscountedPrice = document.createElement("div");
        jacketDiscountedPrice.textContent = "ON SALE: $ " + jacketSale.discountedPrice;
        jacketDiscountedPrice.style.color = "red";
        jacketPriceContainer.appendChild(jacketDiscountedPrice);
    } else {
        jacketPriceContainer.appendChild(jacketPrice);
    }

    //jacketSizesContainer.appendChild(sizeDropdown);
    
    jacketSaleContainer.append(heading, jacketImage, jacketPriceContainer, /*jacketSizesContainer,*/ seeDetailsButton);
    jacketSaleWrapper.appendChild(jacketSaleContainer);
    
    return jacketSaleContainer;
}

async function displayJackets(jacketsSale) {
    const displayContainer = document.querySelector(".jacket-sale-wrapper");
    jacketsSale.forEach((jacketSale) => {
        const jacketHtml = generateJacketHtml(jacketSale);
        console.log(jacketSale);
        displayContainer.appendChild(jacketHtml);
    });
}

async function main() {
    const responseData = await doFetch(API_JACKETS_URL);
        const jacketsSale = responseData.data.filter(jacketSale => jacketSale.onSale === true);
        displayJackets(jacketsSale);
}

main();