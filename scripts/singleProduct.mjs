
import { API_PRODUCT_URL } from "./utils/constants.mjs";
import { doFetch } from "./utils/doFetch.mjs";

function generateJacketHtml(jacketProduct) {
    const singleProductWrapper = document.createElement("div");
    singleProductWrapper.classList.add("single-product-wrapper");

    const heading = document.createElement("h3");
    heading.textContent = jacketProduct.title;

    const jacketImage = document.createElement("img");
    jacketImage.src = jacketProduct.image.url;

    const productDescription = document.createElement("div");
    productDescription.textContent = jacketProduct.description;

    const productColor = document.createElement("div");
    productColor.textContent = jacketProduct.baseColor;

    const jacketPriceContainer = document.createElement("div");
    jacketPriceContainer.classList.add("product-price-container");

    const jacketPrice = document.createElement("div");
    jacketPrice.textContent = "$ " + jacketProduct.price;

    const jacketSizesContainer = document.createElement("div");
    jacketSizesContainer.classList.add("product-size-container");
    
    const sizeDropdown = document.createElement("select");
    sizeDropdown.classList.add("size-dropdown");

    jacketProduct.sizes.forEach(size => {
        const option = document.createElement("option");
        option.value = size;
        option.textContent = size;
        sizeDropdown.appendChild(option);
    });

    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.addEventListener("click", () => {
        const selectedSize = sizeDropdown.value;
    });

    if (jacketProduct.onSale !== false) {
        const jacketDiscountedPrice = document.createElement("div");
        jacketDiscountedPrice.textContent = "ON SALE: $ " + jacketProduct.discountedPrice;
        jacketDiscountedPrice.style.color = "red";
        jacketPriceContainer.appendChild(jacketDiscountedPrice);
    } else {
        jacketPriceContainer.appendChild(jacketPrice);
    }
}

singleProductWrapper.append(heading, jacketImage, productDescription, productColor, jacketPriceContainer, jacketSizesContainer, addtoCartButton)



async function displaySingleJacket(productId) {
    const responseData = await doFetch(API_PRODUCT_URL.replace('<id>', productId));
    const jacketProduct = responseData.data;

    const singleJacketHtml = generateJacketHtml(jacketProduct);
    const displayContainer = document.querySelector(".single-product-wrapper");
    displayContainer.innerHTML = ''; // Clear previous content
    displayContainer.appendChild(singleJacketHtml);
}

const seeDetailsButtons = document.querySelectorAll('.see-details-button');
seeDetailsButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        displaySingleProductPage(productId);
    });
});

async function main() {
    displaySingleJacket(productId);
}

main();