import apiClient from "./apiClient";

// Example API service that uses the authenticated API client
export const userService = {
  // Get user profile (requires authentication)
  getProfile: async () => {
    try {
      const response = await apiClient.get("/user/profile");
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to get user profile";
    }
  },

  // Update user profile (requires authentication)
  updateProfile: async (userData) => {
    try {
      const response = await apiClient.put("/user/profile", userData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to update profile";
    }
  },

  // Get user orders (requires authentication)
  getOrders: async () => {
    try {
      const response = await apiClient.get("/user/orders");
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to get orders";
    }
  },
};

export const productService = {
  // Get all products (public)
  getAllProducts: async () => {
    try {
      const response = await apiClient.get("/products");
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to get products";
    }
  },

  // Add product to wishlist (requires authentication)
  addToWishlist: async (productId) => {
    try {
      const response = await apiClient.post("/wishlist", { productId });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to add to wishlist";
    }
  },

  // Add product to cart (requires authentication)
  addToCart: async (productId, quantity = 1) => {
    try {
      const response = await apiClient.post("/cart", { productId, quantity });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to add to cart";
    }
  },
};

export const adminService = {
  // Create product (requires admin authentication)
  createProduct: async (productData) => {
    try {
      const response = await apiClient.post("/admin/products", productData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to create product";
    }
  },

  // Update product (requires admin authentication)
  updateProduct: async (productId, productData) => {
    try {
      const response = await apiClient.put(
        `/admin/products/${productId}`,
        productData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to update product";
    }
  },

  // Delete product (requires admin authentication)
  deleteProduct: async (productId) => {
    try {
      const response = await apiClient.delete(`/admin/products/${productId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to delete product";
    }
  },

  // Get all users (requires admin authentication)
  getAllUsers: async () => {
    try {
      const response = await apiClient.get("/admin/users");
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to get users";
    }
  },
};
