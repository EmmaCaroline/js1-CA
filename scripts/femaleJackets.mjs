
import { API_JACKETS_URL } from "./utils/constants.mjs";
import { doFetch } from "./utils/doFetch.mjs";

function generateJacketHtml(jacketFemale) {
    //return jacket HTML
    const jacketFemaleWrapper = document.createElement("div");
    jacketFemaleWrapper.classList.add("jacket-female-wrapper");

    const jacketFemaleContainer = document.createElement("div");
    jacketFemaleContainer.classList.add("jacket-female-container");

    const heading = document.createElement("h3");
    heading.textContent = jacketFemale.title;

    const jacketImage = document.createElement("img");
    jacketImage.src = jacketFemale.image.url;

    const jacketPriceContainer = document.createElement("div");
    jacketPriceContainer.classList.add("jacket-female-price-container");

    const jacketPrice = document.createElement("div");
    jacketPrice.textContent = "$ " + jacketFemale.price;

    const jacketSizesContainer = document.createElement("div");
    jacketSizesContainer.classList.add("jacket-size-container");
    
    const sizeDropdown = document.createElement("select");
    sizeDropdown.classList.add("size-dropdown");

    jacketFemale.sizes.forEach(size => {
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

    if (jacketFemale.onSale !== false) {
        const jacketDiscountedPrice = document.createElement("div");
        jacketDiscountedPrice.textContent = "ON SALE: $ " + jacketFemale.discountedPrice;
        jacketDiscountedPrice.style.color = "red";
        jacketPriceContainer.appendChild(jacketDiscountedPrice);
    } else {
        jacketPriceContainer.appendChild(jacketPrice);
    }

    jacketSizesContainer.appendChild(sizeDropdown);
    
    jacketFemaleContainer.append(heading, jacketImage, jacketPriceContainer, jacketSizesContainer, addToCartButton);
    jacketFemaleWrapper.appendChild(jacketFemaleContainer);
    
    return jacketFemaleContainer;
}

async function displayJackets(jacketsFemale) {
    const displayContainer = document.querySelector(".jacket-female-wrapper");
    jacketsFemale.forEach((jacketFemale) => {
        const jacketHtml = generateJacketHtml(jacketFemale);
        console.log(jacketFemale);
        displayContainer.appendChild(jacketHtml);
    });
}

async function main() {
    const responseData = await doFetch(API_JACKETS_URL);
        const jacketsFemale = responseData.data.filter(jacketFemale => jacketFemale.gender === "Female");
        displayJackets(jacketsFemale);
}

main();