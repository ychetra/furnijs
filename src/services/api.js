const BASE_URL = "https://fakestoreapi.com";

// Get all products
export const getAllProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Get cart items (with optional limit)
export const getCartItems = async (limit = 2) => {
  try {
    const response = await fetch(`${BASE_URL}/products?limit=${limit}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return [];
  }
};

// Get single product
export const getProduct = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

// Cart operations using localStorage
export const cartAPI = {
  getCartItems: () => {
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    return items;
  },

  addToCart: (product) => {
    const items = cartAPI.getCartItems();
    const existingItem = items.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      items.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cartItems', JSON.stringify(items));
    window.dispatchEvent(new Event('cartUpdated'));
  },

  updateQuantity: (productId, newQuantity) => {
    const items = cartAPI.getCartItems();
    const item = items.find(item => item.id === productId);
    
    if (item) {
      item.quantity = newQuantity;
      localStorage.setItem('cartItems', JSON.stringify(items));
      window.dispatchEvent(new Event('cartUpdated'));
    }
  },

  removeFromCart: (productId) => {
    const items = cartAPI.getCartItems();
    const updatedItems = items.filter(item => item.id !== productId);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    window.dispatchEvent(new Event('cartUpdated'));
  }
};
