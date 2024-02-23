
import { API_JACKETS_URL } from "./utils/constants.mjs";
import { doFetch } from "./utils/doFetch.mjs";
import { updateCartCount } from './singleProduct.mjs';
import { updateCartIcon } from './singleProduct.mjs';

function generateJacketHtml(jacketMale) {

    const jacketMaleContainer = document.createElement("div");
    jacketMaleContainer.classList.add("jacket-male-container");

    const heading = document.createElement("h3");
    heading.textContent = jacketMale.title;

    const jacketImage = document.createElement("img");
    jacketImage.src = jacketMale.image.url;
    jacketImage.addEventListener('click', function() {
        window.location.href = `../product/index.html?id=${jacketMale.id}`;
    });

    const jacketPriceContainer = document.createElement("div");
    jacketPriceContainer.classList.add("jacket-male-price-container");

    const jacketPrice = document.createElement("div");
    jacketPrice.textContent = "$ " + jacketMale.price;

    const seeDetailsButton = document.createElement("button");
    seeDetailsButton.textContent = "See Details";
    seeDetailsButton.addEventListener('click', function() {
        window.location.href = `../product/index.html?id=${jacketMale.id}`;
    });

    if (jacketMale.onSale !== false) {
        const jacketDiscountedPrice = document.createElement("div");
        jacketDiscountedPrice.textContent = "ON SALE: $ " + jacketMale.discountedPrice;
        jacketDiscountedPrice.style.color = "red";
        jacketPriceContainer.appendChild(jacketDiscountedPrice);
    } else {
        jacketPriceContainer.appendChild(jacketPrice);
    }
    
    jacketMaleContainer.append(heading, jacketImage, jacketPriceContainer, seeDetailsButton);
    
    return jacketMaleContainer;
}

async function displayJackets(jacketsMale) {
    const displayContainer = document.querySelector(".jacket-male-wrapper");
    displayContainer.textContent = "";
    jacketsMale.forEach((jacketMale) => {
        const jacketHtml = generateJacketHtml(jacketMale);
        console.log(jacketMale);
        displayContainer.appendChild(jacketHtml);
    });
}

async function main() {
    const responseData = await doFetch(API_JACKETS_URL);
        const jacketsMale = responseData.data.filter(jacketMale => jacketMale.gender === "Male");
        displayJackets(jacketsMale);
}

main();