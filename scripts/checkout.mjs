
import { updateCartCount } from './singleProduct.mjs';
import { updateCartIcon } from './singleProduct.mjs';

function generateHtmlForItem(jacket) {
    const jacketWrapper = document.createElement("div");
    jacketWrapper.classList.add("cart-item");

    const jacketTitle = document.createElement("h3");
    jacketTitle.textContent = jacket.title;

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");

    const jacketImage = document.createElement("img");
    jacketImage.src = jacket.image.url;
    jacketImage.classList.add("image-style");

    imageContainer.appendChild(jacketImage);

    const jacketQuantity = document.createElement("div");
    jacketQuantity.textContent = "Quantity: " + jacket.quantity;
    jacketQuantity.classList.add("quantity-style");

    const selectedSizeContainer = document.createElement("div");
    selectedSizeContainer.id = "selected-size";
    const selectedSizeElement = document.createElement("div");
    selectedSizeElement.textContent = "Selected Size: " + jacket.selectedSize;

    selectedSizeContainer.appendChild(selectedSizeElement);
    
    const jacketPrice = document.createElement("div");
    jacketPrice.textContent = "$ " + jacket.price;
    jacketPrice.classList.add("price-style");

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("buttonContainer");

    const removeButton = document.createElement("button");
    removeButton.textContent = "X";
    removeButton.classList.add("remove-button");
    removeButton.addEventListener("click", () => {
        removeFromCart(jacket.id);
    });

    buttonContainer.appendChild(removeButton);

    const cartIconDiv = document.createElement("div");
    cartIconDiv.id = "cartIcon";

    jacketWrapper.append(jacketTitle, imageContainer, jacketQuantity, selectedSizeContainer, jacketPrice, buttonContainer, cartIconDiv);
    return jacketWrapper;
}

function displayCartItems() {
    const displayContainer = document.getElementById("cart-items-display");
    const cart = JSON.parse(localStorage.getItem("cart"));
    
    displayContainer.innerHTML = "";

    let totalPrice = 0; 

    cart.forEach(function(currentItem) {
        const itemHtml = generateHtmlForItem(currentItem);
        displayContainer.appendChild(itemHtml);
        totalPrice += currentItem.price * currentItem.quantity;
    });

    const totalPriceElement = document.createElement("div");
    totalPriceElement.textContent = "Total Price: $" + totalPrice.toFixed(2); 
    totalPriceElement.classList.add("total-price");
    displayContainer.appendChild(totalPriceElement);
}

function removeFromCart(itemId) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const updatedCart = cart.filter(item => item.id !== itemId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateCartCount(updatedCart.length);
    updateCartIcon("../checkout/index.html");
    displayCartItems(); 
}

function generateForm() {
    const formContainer = document.createElement('div');
    formContainer.classList.add('formContainer');

    const form = document.createElement('form');

    const deliveryOptions = document.createElement('div');
    deliveryOptions.classList.add('delivery-options');

    const internationalShippingLabel = document.createElement('label');
    internationalShippingLabel.setAttribute('for', 'international-shipping');
    internationalShippingLabel.innerHTML = `
        <input type="radio" id="international-shipping" name="delivery-option" value="international-shipping">
        International Free Shipping
    `;

    deliveryOptions.appendChild(internationalShippingLabel);

    const personalInfo = document.createElement('div');
    personalInfo.classList.add('personal-info');

    const fields = [
        { id: 'firstName', label: 'First name' },
        { id: 'lastName', label: 'Last name' },
        { id: 'address', label: 'Address' },
        { id: 'zipcode', label: 'Zip Code' },
        { id: 'town', label: 'Town' },
        { id: 'country', label: 'Country' },
        { id: 'email', label: 'Email' },
        { id: 'phonenumber', label: 'Phone Number' }
    ];

    fields.forEach(field => {
        const label = document.createElement('label');
        label.setAttribute('for', field.id);
        label.classList.add('visually-hidden');
        label.textContent = field.label;

        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', field.id);
        input.setAttribute('name', field.id);
        input.setAttribute('placeholder', `${field.label}`);

        personalInfo.appendChild(label);
        personalInfo.appendChild(input);
    });

    const paymentOptions = document.createElement('div');
    paymentOptions.classList.add('payment-options');

    const creditDebitLabel = document.createElement('label');
    creditDebitLabel.setAttribute('for', 'credit-debit');
    creditDebitLabel.innerHTML = `
        <input type="radio" id="credit-debit" name="payment-option" value="credit-debit">
        Credit Card or Debit Card
    `;

    paymentOptions.appendChild(creditDebitLabel);

    const paymentInfo = document.createElement('div');
    paymentInfo.classList.add('payment-info');

    const paymentFields = [
        { id: 'cardholder', label: 'Cardholder Name' },
        { id: 'cardnumber', label: 'Card Number' },
        { id: 'monthyear', label: 'MM/YY' },
        { id: 'cvc', label: 'CVC' }
    ];

    paymentFields.forEach(field => {
        const label = document.createElement('label');
        label.setAttribute('for', field.id);
        label.classList.add('visually-hidden');
        label.textContent = field.label;

        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', field.id);
        input.setAttribute('name', field.id);
        input.setAttribute('placeholder', `${field.label}`);

        paymentInfo.appendChild(label);
        paymentInfo.appendChild(input);
    });

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn');

    const button = document.createElement('button');
    button.setAttribute('type', 'button');

    const link = document.createElement('a');
    link.setAttribute('href', 'checkoutsuccess/index.html');
    link.textContent = 'Confirm Payment';

    button.appendChild(link);
    btnContainer.appendChild(button);

    form.append(deliveryOptions, personalInfo, paymentOptions, paymentInfo, btnContainer);

    formContainer.appendChild(form);

    return formContainer;
}

export function clearCart() { 
    localStorage.setItem("cart", JSON.stringify([]));
    updateCartCount(0);
    updateCartIcon();
}

function main() {
    window.onload = function() {
        updateCartIcon("..");
        displayCartItems();
        
        const cart = JSON.parse(localStorage.getItem("cart"));
        if (cart && cart.length > 0) {
            const formContainer = generateForm();
            document.body.insertBefore(formContainer, document.querySelector("footer").previousSibling);
            formContainer.style.display = "block"; 
        }
    };
}

main();