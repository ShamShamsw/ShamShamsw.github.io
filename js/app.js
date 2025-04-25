// app.js

// Import authentication functions from auth.js
import { login, logout, isAuthenticated, getIdToken } from './auth.js';

// Get references to HTML elements
const orderBtn = document.getElementById('order-btn');
const orderPopup = document.getElementById('order-popup');
const closePopupButtons = document.querySelectorAll('.close-popup');
const orderForm = document.getElementById('order-form');
const fetchOrderBtn = document.getElementById('fetch-order-btn');
const fetchOrderPopup = document.getElementById('fetch-order-popup');
const checkOrderBtn = document.getElementById('check-order-btn');
const orderIdInput = document.getElementById('order-id-input');
const fetchProductBtn = document.getElementById('fetch-product-btn');
const fetchProductPopup = document.getElementById('fetch-product-popup');
const getProductInfoBtn = document.getElementById('get-product-info-btn');
const productIdInput = document.getElementById('product-id-input');
const fetchInventoryBtn = document.getElementById('fetch-inventory-btn');
const fetchInventoryPopup = document.getElementById('fetch-inventory-popup');
const addProductBtn = document.getElementById('add-product-btn');
const productInputsContainer = document.getElementById('product-inputs-container');

let productCount = 1;

// Event listeners for showing popups
orderBtn.addEventListener('click', () => {
  orderPopup.classList.add('show');
});

fetchOrderBtn.addEventListener('click', () => {
  fetchOrderPopup.classList.add('show');
});

fetchProductBtn.addEventListener('click', () => {
  fetchProductPopup.classList.add('show');
});

fetchInventoryBtn.addEventListener('click', () => {
  fetchInventoryPopup.classList.add('show');
});

// Event listeners for closing popups
closePopupButtons.forEach(button => {
  button.addEventListener('click', () => {
    let popup = button.closest('.popup');
    if (popup) {
      popup.classList.remove('show');
    }
  });
});

// Event listener for adding product to the order form
addProductBtn.addEventListener('click', () => {
  productCount++;
  const newProductInput = document.createElement('div');
  newProductInput.innerHTML = `
    <label>Product ${productCount} ID:</label>
    <input type="text" name="productId[]" ><br>
    <label>Quantity ${productCount}:</label>
    <input type="number" name="quantity[]" value="1" min="1" ><br><br>
  `;
  productInputsContainer.appendChild(newProductInput);
});

// Event listener for submitting the order form
orderForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const customerId = orderForm.customerId.value;
  const productIds = document.querySelectorAll('input[name="productId[]"]');
  const quantities = document.querySelectorAll('input[name="quantity[]"]');
  const items = [];
  let total = 0;

  productIds.forEach((input, index) => {
    if (input.value) {
      const quantityValue = parseInt(quantities[index].value);
      if (quantityValue > 0) {
        items.push({
          productId: input.value,
          quantity: quantityValue,
        });
      }
    }
  });
  const totalInput = document.querySelector('input[name="total"]');
  if (totalInput) {
    total = parseFloat(totalInput.value);
  }

  const orderData = {
    customerId: customerId,
    items: items,
    total: total,
  };

  // Include the ID token in the Authorization header for authenticated requests
  const idToken = getIdToken();
  const headers = { 'Content-Type': 'application/json' };
  if (idToken) {
    headers['Authorization'] = `Bearer ${idToken}`;
  }

  fetch('https://p2yv6a2651.execute-api.us-west-2.amazonaws.com/prod/create-order', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(orderData),
  })
  .then(response => {
    if (!response.ok) {
      return response.text().then(text => { throw new Error(text) });
    }
    return response.json();
  })
  .then(data => {
    console.log('Order created:', data);
    alert('Order created successfully! Order ID: ' + data.orderId);
    orderForm.reset();
    orderPopup.classList.remove('show');
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Failed to create order: ' + error.message);
  });
});

// Function to fetch inventory
async function fetchInventory() {
  try {
    const idToken = getIdToken();
    const headers = {};
    if (idToken) {
      headers['Authorization'] = `Bearer ${idToken}`;
    }
    const response = await fetch('https://p2yv6a2651.execute-api.us-west-2.amazonaws.com/prod/get-inventory', {
      headers: headers
    });
    if (response.ok) {
      const inventory = await response.json();
      document.getElementById("inventory-details").innerText = JSON.stringify(inventory, null, 2);
      fetchInventoryPopup.classList.add('show');
    } else {
      const errorText = await response.text();
      document.getElementById("inventory-details").innerText = `Error loading inventory: ${errorText}`;
    }
  } catch (error) {
    document.getElementById("inventory-details").innerText = "Network error: " + error.message;
  }
}

// Function to fetch product info
async function fetchProductInfo(productId) {
  if (!productId) return alert("Please enter a Product ID.");
  try {
    const idToken = getIdToken();
    const headers = {};
    if (idToken) {
      headers['Authorization'] = `Bearer ${idToken}`;
    }
    const response = await fetch(`https://p2yv6a2651.execute-api.us-west-2.amazonaws.com/prod/get-product-info?productId=${productId}`, {
      headers: headers
    });
    if (response.ok) {
      const productInfo = await response.json();
      document.getElementById("product-details").innerText = JSON.stringify(productInfo, null, 2);
      fetchProductPopup.classList.add('show');
    } else {
      const errorText = await response.text();
      document.getElementById("product-details").innerText = `Product not found: ${errorText}`;
    }
  } catch (error) {
    document.getElementById("product-details").innerText = "Network error: " + error.message;
  }
}

// Event listener for getting product info
getProductInfoBtn.addEventListener('click', () => {
  const productId = document.getElementById('product-id-input').value;
  fetchProductInfo(productId);
});

// Function to fetch order details
async function fetchOrder(orderId) {
  if (!orderId) return alert("Please enter an Order ID.");
  try {
    const idToken = getIdToken();
    const headers = {};
    if (idToken) {
      headers['Authorization'] = `Bearer ${idToken}`;
    }
    const response = await fetch(`https://p2yv6a2651.execute-api.us-west-2.amazonaws.com/prod/get-order?orderId=${orderId}`, {
      headers: headers
    });
    if (response.ok) {
      const order = await response.json();
      document.getElementById("order-details").innerText = JSON.stringify(order, null, 2);
      fetchOrderPopup.classList.add('show');
    } else {
      const errorText = await response.text();
      document.getElementById("order-details").innerText = `Order not found: ${errorText}`;
    }
  } catch (error) {
    document.getElementById("order-details").innerText = "Network error: " + error.message;
  }
}

// Event listener for checking order
checkOrderBtn.addEventListener('click', () => {
  const orderId = document.getElementById('order-id-input').value;
  fetchOrder(orderId);
});

// Event listener for fetching inventory
fetchInventoryBtn.addEventListener('click', fetchInventory);

// Basic check for authentication status on page load (for example, to redirect)
document.addEventListener('DOMContentLoaded', () => {
  if (!isAuthenticated() && window.location.pathname === '/dashboard.html') {
    window.location.href = '/index.html'; // Redirect to login if not authenticated on dashboard
  }
});
