

import { clearCart } from './checkout.mjs';
import { updateCartCount } from './singleProduct.mjs';
import { updateCartIcon } from './singleProduct.mjs';

function createOrderConfirmation() {
    const container = document.createElement('div');
    container.classList.add('on-the-way');

    const paragraphs = [
        "Your order is on the way",
        "A detailed order confirmation has been sent to your email",
        "You will receive a new email with tracking information when your order has been shipped from our storage.",
        "We hope your new jacket brings you comfort on your adventures!",
        "RAINYDAYS - Pushing the Comfort Zone"
    ];

    paragraphs.forEach(text => {
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        container.appendChild(paragraph);
    });

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons');

    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    const link = document.createElement('a');
    link.setAttribute('href', 'index.html');
    link.textContent = 'Want to shop more?';
    button.appendChild(link);

    buttonsContainer.appendChild(button);
    container.appendChild(buttonsContainer);

    return container;
}

function main() {
    const orderConfirmationDiv = createOrderConfirmation();
    document.body.insertBefore(orderConfirmationDiv, document.querySelector("footer").previousSibling);
    clearCart()
}

main();