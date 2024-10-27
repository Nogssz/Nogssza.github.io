// Carregar produtos a partir de um arquivo JSON
const products = [
    {
        id: 1,
        name: "Notebook",
        description: "Notebook Dell Inspiron 15 3000",
        price: 2999.99,
        category: "Notebook",
        brand: "Dell",
        images: ["notebook-dell.jpg", "notebook-dell-2.jpg"]
    },
    {
        id: 2,
        name: "Monitor",
        description: "Monitor LG 24' LED Full HD",
        price: 899.99,
        category: "Monitor",
        brand: "LG",
        images: ["monitor-lg.jpg", "monitor-lg-2.jpg"]
    },
    {
        id: 3,
        name: "Teclado",
        description: "Teclado Mecânico Gamer HyperX Alloy FPS",
        price: 299.99,
        category: "Teclado",
        brand: "HyperX",
        images: ["teclado-hyperx.jpg", "teclado-hyperx-2.jpg"]
    }
];

// Exibir produtos na página inicial
function displayProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    products.forEach(product => {
        const productElement = `
            <div class="product">
                <h3>${product.name}</h3>
                <img src="${product.images[0]}" alt="${product.name}">
                <p>R$ ${product.price.toFixed(2)}</p>
                <a href="product.html?id=${product.id}">Ver Detalhes</a>
            </div>
        `;
        productList.innerHTML += productElement;
    });
}

// Carregar detalhes do produto
function loadProductDetails() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const product = products.find(p => p.id == productId);

    if (product) {
        document.getElementById('productDetails').innerHTML = `
            <h1>${product.name}</h1>
            <img src="${product.images[0]}" alt="${product.name}">
            <p>${product.description}</p>
            <p>R$ ${product.price.toFixed(2)}</p>
        `;
    }
}

// Carrinho - Adicionar, remover e exibir itens
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id == productId);
    
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Produto adicionado ao carrinho!');
    }
}

function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    cart.forEach(item => {
        cartItems.innerHTML += `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>R$ ${item.price.toFixed(2)}</p>
                <button onclick="removeFromCart(${item.id})">Remover</button>
            </div>
        `;
    });
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

// Funções de inicialização
window.onload = function() {
    if (document.getElementById('productList')) {
        displayProducts();
    }
    if (document.getElementById('productDetails')) {
        loadProductDetails();
    }
    if (document.getElementById('cartItems')) {
        displayCartItems();
    }
};
