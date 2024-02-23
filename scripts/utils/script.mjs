
let contentDiv;

function setContentDiv(page) {
    if (page === 'index.html') {
        contentDiv = document.querySelector('.jacket-wrapper');
    } else if (page === '/women/index.html') {
        contentDiv = document.querySelector('.jacket-female-wrapper');
    } else if (page === '/men/index.html') {
        contentDiv = document.querySelector('.jacket-male-wrapper');
    } else if (page === '/sale/index.html') {
        contentDiv = document.querySelector('.jacket-sale-wrapper');
    } else if (page === '/product/index.html') {
        contentDiv = document.querySelector('.single-product-wrapper');
    } else if (page === '/checkout/index.html') {
        contentDiv = document.querySelector('.cart-items-display'); 
    }
}

async function loadPage(page) {
    try {
        setContentDiv(page);
        const response = await fetch(page);
        const html = await response.text();
        contentDiv.innerHTML = html;
    } catch (error) {
            console.error('Error loading page:', error);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    loadPage(path);
});

window.addEventListener('popstate', () => {
    const path = window.location.pathname;
    loadPage(path);
});