import AsyncStorage from "@react-native-async-storage/async-storage";
import { server } from "@/redux/store";

import {
  USER_LOADING,
  USER_LOADED,
  USER_ERROR,
  USER_LOGOUT,
  LOAD_USER_FROM_STORAGE,
  CLEAR_ERROR,
  ADD_TO_CART_SUCCESS,
  REMOVE_FROM_CART,
} from "./actionTypes"; // Import from actionTypes.js

const API_BASE_URL = server; // Replace with your actual API URL

// Load user from AsyancStorage (synchronous Redux action)
export const loadUserFromStorage = (authData) => {
  return {
    type: LOAD_USER_FROM_STORAGE,
    payload: authData,
  };
};

// Get user data from API
export const getUserData = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LOADING });

    // Get token from current state or AsyncStorage
    let token = getState().user.token;

    if (!token) {
      const authData = await AsyncStorage.getItem("@auth");
      if (authData) {
        const parsedData = JSON.parse(authData);
        token = parsedData.token;
      }
    }

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();

      // If token is invalid/expired, clear storage
      if (response.status === 401) {
        await AsyncStorage.removeItem("@auth");
        dispatch({ type: USER_LOGOUT });
        return;
      }

      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const userData = await response.json();

    // Update AsyncStorage with fresh data
    const authData = {
      token,
      user: userData.user || userData,
    };

    await AsyncStorage.setItem("@auth", JSON.stringify(authData));

    dispatch({
      type: USER_LOADED,
      payload: authData,
    });
  } catch (error) {
    // If it's a network error, don't logout the user
    if (
      error.message.includes("Network request failed") ||
      error.message.includes("fetch")
    ) {
      dispatch({
        type: USER_ERROR,
        payload: "Network error. Please check your connection.",
      });
    } else {
      // For other errors, logout the user
      await AsyncStorage.removeItem("@auth");
      dispatch({
        type: USER_ERROR,
        payload: error.message || "Failed to get user data",
      });
    }
  }
};

// Check user's auth status (e.g., on app launch)
export const checkAuthStatus = () => async (dispatch) => {
  try {
    const authData = await AsyncStorage.getItem("@auth");

    if (authData) {
      const parsedData = JSON.parse(authData);
      dispatch({
        type: LOAD_USER_FROM_STORAGE,
        payload: parsedData,
      });
    } else {
      dispatch({ type: USER_LOGOUT });
    }
  } catch (error) {
    console.error("❌ Error checking auth status:", error);
    dispatch({
      type: USER_ERROR,
      payload: "Failed to check auth status",
    });
  }
};

// Login user
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOADING });

    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const responseText = await response.text(); // Get the response as text

    if (!response.ok) {
      alert("Invalid Inputs");
    }

    const data = JSON.parse(responseText);
    const authData = {
      token: data.token,
      user: data.user,
    };

    // Store in AsyncStorage
    await AsyncStorage.setItem("@auth", JSON.stringify(authData));

    dispatch({
      type: USER_LOADED,
      payload: authData,
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error.message || "Login failed",
    });
  }
};

// Logout user
export const logoutUser = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem("@auth");
  } catch (error) {
    error;
  } finally {
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: CLEAR_ERROR }); // Prevent residual UI errors
  }
};

// Clear error
export const clearError = () => ({
  type: CLEAR_ERROR,
});

// Register user
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOADING });

    const response = await fetch(`${API_BASE_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    const authData = {
      token: data.token,
      user: data.user,
    };

    // Store in AsyncStorage
    await AsyncStorage.setItem("@auth", JSON.stringify(authData));

    dispatch({
      type: USER_LOADED,
      payload: authData,
    });
    return { success: true, message: data.message };
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error.message || "Registration failed",
    });
    return { success: false, message: error.message };
  }
};

// get categories action
export const getCategories = () => async (dispatch) => {
  try {
    dispatch({
      type: "CATEGORY_LOADING",
    });
    const response = await fetch(`${API_BASE_URL}/cat/get-all`);
    const data = await response.json();

    dispatch({
      type: "CATEGORY_LOADED",
      payload: data.categories || data,
    });
  } catch (error) {
    dispatch({
      type: "CATEGORY_ERROR",
      payload: error.message || "Failed to load categories",
    });
  }
};

// GET PRODUCT ACTIONS
export const getProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "PRODUCT_LOADING",
    });
    const response = await fetch(`${API_BASE_URL}/product/get-all`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch products");
    }

    dispatch({
      type: "PRODUCT_LOADED",
      payload: data.products || data,
    });
  } catch (error) {
    dispatch({
      type: "PRODUCT_ERROR",
      payload: error.message || "Failed to load product",
    });
  }
};

// ADD TO CART ACTIONS
export const addToCart = (item) => {
  return {
    type: ADD_TO_CART_SUCCESS,
    payload: item, // should include quantity
  };
};

// REMOVE FROM CART ACTIONS
export function removeFromCart(item) {
  return {
    type: REMOVE_FROM_CART,
    payload: item,
  };
}

// Payment Actions
export const paymentActions = () => async (dispatch) => {
  try {
    dispatch({
      type: "PAYMENT_LOADING",
    });

    const response = await fetch(`${API_BASE_URL}/order/payments`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Payment Failed");
    }
    dispatch({
      type: "PAYMENT_SUCCESS",
      payload: data.message || data,
    });
  } catch (error) {
    dispatch({
      type: "PAYMENT_FAILED",
      payload: error.message || "Payment Failed",
    });
  }
};
