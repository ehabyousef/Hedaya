// Utility functions for authentication

/**
 * Get the authentication token from localStorage
 * @returns {string|null} The auth token or null if not found
 */
export const getAuthToken = () => {
  return localStorage.getItem("userToken");
};

/**
 * Get authorization headers for API requests
 * @returns {Object} Headers object with authorization token
 */
export const getAuthHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Create axios config with auth headers
 * @returns {Object} Axios config object with authorization headers
 */
export const getAuthConfig = () => {
  return {
    headers: getAuthHeaders(),
  };
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if user has a valid token
 */
export const isAuthenticated = () => {
  const token = getAuthToken();
  if (!token) return false;

  try {
    // Check if token is expired (basic check)
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
};

/**
 * Remove auth token (for logout)
 */
export const removeAuthToken = () => {
  localStorage.removeItem("userToken");
};
