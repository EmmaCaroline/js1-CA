
import { API_JACKETS_URL } from "./utils/constants.mjs";
import { doFetch } from "./utils/doFetch.mjs";
import { updateCartCount } from './singleProduct.mjs';
import { updateCartIcon } from './singleProduct.mjs';

function generateJacketHtml(jacketFemale) {

    const jacketFemaleContainer = document.createElement("div");
    jacketFemaleContainer.classList.add("jacket-female-container");

    const heading = document.createElement("h3");
    heading.textContent = jacketFemale.title;

    const jacketImage = document.createElement("img");
    jacketImage.src = jacketFemale.image.url;
    jacketImage.addEventListener('click', function() {
        window.location.href = `../product/index.html?id=${jacketFemale.id}`;
    });

    const jacketPriceContainer = document.createElement("div");
    jacketPriceContainer.classList.add("jacket-female-price-container");

    const jacketPrice = document.createElement("div");
    jacketPrice.textContent = "$ " + jacketFemale.price;

    const seeDetailsButton = document.createElement("button");
    seeDetailsButton.textContent = "See Details";
    seeDetailsButton.addEventListener('click', function() {
        window.location.href = `../product/index.html?id=${jacketFemale.id}`;
    });

    if (jacketFemale.onSale !== false) {
        const jacketDiscountedPrice = document.createElement("div");
        jacketDiscountedPrice.textContent = "ON SALE: $ " + jacketFemale.discountedPrice;
        jacketDiscountedPrice.style.color = "red";
        jacketPriceContainer.appendChild(jacketDiscountedPrice);
    } else {
        jacketPriceContainer.appendChild(jacketPrice);
    }
    
    jacketFemaleContainer.append(heading, jacketImage, jacketPriceContainer, seeDetailsButton);
    
    return jacketFemaleContainer;
}

async function displayJackets(jacketsFemale) {
    const displayContainer = document.querySelector(".jacket-female-wrapper");
    displayContainer.textContent = "";
    jacketsFemale.forEach((jacketFemale) => {
        const jacketHtml = generateJacketHtml(jacketFemale);
        console.log(jacketFemale);
        displayContainer.appendChild(jacketHtml);
    });
}

async function main() {
    const responseData = await doFetch(API_JACKETS_URL);
    const jacketsFemale = responseData.data.filter(jacketFemale => jacketFemale.gender === "Female"); //
    displayJackets(jacketsFemale); //
}

main();