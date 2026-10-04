// ===============================
// Product Data
// ===============================

const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 49.99,
        description: "High-quality wireless headphones",
        image: "🎧"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 79.99,
        description: "Smart watch with fitness tracking",
        image: "⌚"
    },
    {
        id: 3,
        name: "Running Shoes",
        price: 59.99,
        description: "Comfortable shoes for running",
        image: "👟"
    },
    {
        id: 4,
        name: "Backpack",
        price: 39.99,
        description: "Stylish backpack for daily use",
        image: "🎒"
    },
    {
        id: 5,
        name: "Camera",
        price: 299.99,
        description: "Capture your favorite moments",
        image: "📷"
    },
    {
        id: 6,
        name: "Laptop",
        price: 799.99,
        description: "Powerful laptop for work and study",
        image: "💻"
    }
];


// ===============================
// Cart
// ===============================

let cart = [];


// ===============================
// DOM Elements
// ===============================

const productContainer =
    document.getElementById("productContainer");

const cartCount =
    document.getElementById("cartCount");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const cartBtn =
    document.getElementById("cartBtn");

const cartModal =
    document.getElementById("cartModal");

const closeCartBtn =
    document.getElementById("closeCartBtn");

const checkoutBtn =
    document.getElementById("checkoutBtn");

const checkoutModal =
    document.getElementById("checkoutModal");

const closeCheckoutBtn =
    document.getElementById("closeCheckoutBtn");

const checkoutSummary =
    document.getElementById("checkoutSummary");

const confirmOrderBtn =
    document.getElementById("confirmOrderBtn");


// ===============================
// Display Products
// ===============================

function displayProducts() {

    productContainer.innerHTML = "";

    products.forEach(function(product) {

        const productCard = document.createElement("div");

        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <div class="product-image">
                ${product.image}
            </div>

            <h3>${product.name}</h3>

            <p>${product.description}</p>

            <div class="product-price">
                $${product.price.toFixed(2)}
            </div>

            <button 
                class="add-cart-btn"
                onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        `;

        productContainer.appendChild(productCard);
    });
}


// ===============================
// Add Product to Cart
// ===============================

function addToCart(productId) {

    const product = products.find(function(item) {
        return item.id === productId;
    });

    const existingItem = cart.find(function(item) {
        return item.id === productId;
    });

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    updateCart();

    alert(`${product.name} added to cart!`);
}


// ===============================
// Update Cart
// ===============================

function updateCart() {

    displayCart();

    updateCartCount();

    updateCartTotal();
}


// ===============================
// Display Cart
// ===============================

function displayCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p style="text-align:center; padding:20px;">
                Your cart is empty.
            </p>
        `;

        return;
    }

    cart.forEach(function(item) {

        const cartItem = document.createElement("div");

        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <div class="cart-item-info">

                <h4>
                    ${item.image} ${item.name}
                </h4>

                <p>
                    $${item.price.toFixed(2)} each
                </p>

            </div>

            <div class="quantity-controls">

                <button
                    class="quantity-btn"
                    onclick="decreaseQuantity(${item.id})">
                    -
                </button>

                <span>${item.quantity}</span>

                <button
                    class="quantity-btn"
                    onclick="increaseQuantity(${item.id})">
                    +
                </button>

            </div>

            <strong>
                $${(item.price * item.quantity).toFixed(2)}
            </strong>

            <button
                class="remove-btn"
                onclick="removeFromCart(${item.id})">
                Remove
            </button>
        `;

        cartItems.appendChild(cartItem);
    });
}


// ===============================
// Increase Quantity
// ===============================

function increaseQuantity(productId) {

    const item = cart.find(function(item) {
        return item.id === productId;
    });

    if (item) {
        item.quantity++;
    }

    updateCart();
}


// ===============================
// Decrease Quantity
// ===============================

function decreaseQuantity(productId) {

    const item = cart.find(function(item) {
        return item.id === productId;
    });

    if (item) {

        item.quantity--;

        if (item.quantity <= 0) {

            removeFromCart(productId);
            return;
        }
    }

    updateCart();
}


// ===============================
// Remove From Cart
// ===============================

function removeFromCart(productId) {

    cart = cart.filter(function(item) {
        return item.id !== productId;
    });

    updateCart();
}


// ===============================
// Cart Count
// ===============================

function updateCartCount() {

    const totalItems = cart.reduce(function(total, item) {

        return total + item.quantity;

    }, 0);

    cartCount.textContent = totalItems;
}


// ===============================
// Cart Total
// ===============================

function updateCartTotal() {

    const total = cart.reduce(function(sum, item) {

        return sum + item.price * item.quantity;

    }, 0);

    cartTotal.textContent = total.toFixed(2);
}


// ===============================
// Open Cart
// ===============================

cartBtn.addEventListener("click", function() {

    cartModal.classList.add("active");

});


// ===============================
// Close Cart
// ===============================

closeCartBtn.addEventListener("click", function() {

    cartModal.classList.remove("active");

});


// ===============================
// Checkout
// ===============================

checkoutBtn.addEventListener("click", function() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    displayCheckout();

    cartModal.classList.remove("active");

    checkoutModal.classList.add("active");
});


// ===============================
// Display Checkout Preview
// ===============================

function displayCheckout() {

    checkoutSummary.innerHTML = "";

    cart.forEach(function(item) {

        const checkoutItem =
            document.createElement("div");

        checkoutItem.classList.add("checkout-item");

        checkoutItem.innerHTML = `
            <span>
                ${item.name} × ${item.quantity}
            </span>

            <strong>
                $${(item.price * item.quantity).toFixed(2)}
            </strong>
        `;

        checkoutSummary.appendChild(checkoutItem);
    });

    const total = cart.reduce(function(sum, item) {

        return sum + item.price * item.quantity;

    }, 0);

    const totalElement =
        document.createElement("div");

    totalElement.classList.add("checkout-total");

    totalElement.textContent =
        `Total: $${total.toFixed(2)}`;

    checkoutSummary.appendChild(totalElement);
}


// ===============================
// Close Checkout
// ===============================

closeCheckoutBtn.addEventListener("click", function() {

    checkoutModal.classList.remove("active");

});


// ===============================
// Confirm Order
// ===============================

confirmOrderBtn.addEventListener("click", function() {

    alert("Order placed successfully! 🎉");

    cart = [];

    updateCart();

    checkoutModal.classList.remove("active");
});


// ===============================
// Close Modal by Clicking Outside
// ===============================

window.addEventListener("click", function(event) {

    if (event.target === cartModal) {

        cartModal.classList.remove("active");
    }

    if (event.target === checkoutModal) {

        checkoutModal.classList.remove("active");
    }
});


// ===============================
// Initial Load
// ===============================

displayProducts();

updateCart();