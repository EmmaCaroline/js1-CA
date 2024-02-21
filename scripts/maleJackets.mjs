
import { API_JACKETS_URL } from "./utils/constants.mjs";
import { doFetch } from "./utils/doFetch.mjs";

function generateJacketHtml(jacketMale) {
    //return jacket HTML
    const jacketMaleWrapper = document.createElement("div");
    jacketMaleWrapper.classList.add("jacket-male-wrapper");

    const jacketMaleContainer = document.createElement("div");
    jacketMaleContainer.classList.add("jacket-male-container");

    const heading = document.createElement("h3");
    heading.textContent = jacketMale.title;

    const jacketImage = document.createElement("img");
    jacketImage.src = jacketMale.image.url;

    const jacketPriceContainer = document.createElement("div");
    jacketPriceContainer.classList.add("jacket-male-price-container");

    const jacketPrice = document.createElement("div");
    jacketPrice.textContent = "$ " + jacketMale.price;

    const jacketSizesContainer = document.createElement("div");
    jacketSizesContainer.classList.add("jacket-size-container");
    
    const sizeDropdown = document.createElement("select");
    sizeDropdown.classList.add("size-dropdown");

    jacketMale.sizes.forEach(size => {
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

    if (jacketMale.onSale !== false) {
        const jacketDiscountedPrice = document.createElement("div");
        jacketDiscountedPrice.textContent = "ON SALE: $ " + jacketMale.discountedPrice;
        jacketDiscountedPrice.style.color = "red";
        jacketPriceContainer.appendChild(jacketDiscountedPrice);
    } else {
        jacketPriceContainer.appendChild(jacketPrice);
    }

    jacketSizesContainer.appendChild(sizeDropdown);
    
    jacketMaleContainer.append(heading, jacketImage, jacketPriceContainer, jacketSizesContainer, addToCartButton);
    jacketMaleWrapper.appendChild(jacketMaleContainer);
    
    return jacketMaleContainer;
}

async function displayJackets(jacketsMale) {
    const displayContainer = document.querySelector(".jacket-male-wrapper");
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