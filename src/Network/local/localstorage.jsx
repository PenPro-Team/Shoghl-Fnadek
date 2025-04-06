import { AxiosLogoutInstance } from "../Remote/AxiosInstance";
const loginInitialState = {
  
    user: null,
    access:null,
    refresh:null,
    isAuthenticated: false,
};

/**
 * Retrieves a value from localStorage and parses it as JSON.
 * @param {string} key - The key to retrieve from localStorage,in case of login it is "auth".
 * @returns {any | null} - The parsed value from localStorage, or null if not found or invalid.
 */
export const getFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  try {
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
    return null;
  }
};

/**
 * Stores a value in localStorage after converting it to a JSON string.
 * @param {string} key - The key under which the value is stored.
 * @param {any} value - The value to store in localStorage.
 */

export const setToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Removes an item from localStorage.
 * @param {string} key - The key to remove from localStorage.
 */
export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

/**
 * Removes an the logged in user data from localStorage.
 *
 */
export const logout = async () => {
  try {
    console.log("Logout API call");
    // Get current user inside function to ensure fresh data
    const currentUser = getFromLocalStorage("auth");
    
    if (!currentUser?.refresh || !currentUser?.access) {
      console.warn("No valid tokens found for logout");
      // Still clear storage even if tokens aren't available
      removeFromLocalStorage("auth");
      removeFromLocalStorage("cart");
      localStorage.setItem("auth", JSON.stringify(loginInitialState));
      return true;
    }
    
    await AxiosLogoutInstance.post(
      "",
      {
        refresh_token: currentUser.refresh,
      },
      {
        headers: {
          Authorization: `Bearer ${currentUser.access}`,
        },
      }
    );
    
    console.log("Logout successful");
    return true;
  } catch (error) {
    console.error("Logout error:", error);
    return false;
  } finally {
    // Always clear storage regardless of API success/failure
    localStorage.removeItem("auth");
    localStorage.setItem("auth", JSON.stringify(loginInitialState));
    console.log("Logout finally block - storage cleared");
  }
};