import axios from "axios";
import {
  CREATE_RIDE_FAILURE,
  CREATE_RIDE_REQUEST,
  CREATE_RIDE_SUCCESS,
  FETCH_MATCHES_FAILURE,
  FETCH_MATCHES_REQUEST,
  FETCH_MATCHES_SUCCESS,
  FETCH_PROFILE_FAILURE,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_RIDES_FAILURE,
  FETCH_RIDES_REQUEST,
  FETCH_RIDES_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from "./ActionType";
import { API_BASE_URL } from "../utilis/ApiConfig";

// // Axios Instance
// const API = axios.create({
//   baseURL: "/api", // Adjust base URL if needed
// });

// // Attach token to headers
// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }
//   return req;
// });

// Register User
export const register = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    dispatch({ type: REGISTER_SUCCESS, payload: data });
    return { success: true, message: data.message }
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.response?.data?.message || error.message });
    return { success: false, message: error.response?.data?.message }
  }
};

// Login User
export const login = (credentials) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    console.log("data login action.jsx ", data.userRes);
    localStorage.setItem("token", data.userRes.token); // Store token after login
    dispatch({ type: LOGIN_SUCCESS, payload: data.userRes });
    return { success: true, message: "Login successful" }
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.response?.data?.message || error.message });
    return { success: false, message: error.response?.data?.message }
  }
};

// Fetch User Profile
export const fetchUserProfile = (token) => async (dispatch) => {
  console.log("token form action.js ", token)
  dispatch({ type: FETCH_PROFILE_REQUEST });
  try {
    const { data } = await axios.get(`${API_BASE_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("data from fetuser action ", data);
    dispatch({ type: FETCH_PROFILE_SUCCESS, payload: { data, token } });
    return { success: true }
  } catch (error) {
    dispatch({ type: FETCH_PROFILE_FAILURE, payload: error.response?.data?.message || error.message });
    return { success: false, message: error.response?.data?.message }
  }
};

// Update User Profile
export const updateUserProfile = (updatedData, token) => async (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_REQUEST });
  try {
    const { data } = await axios.put(`${API_BASE_URL}/user/update`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("data from updata action ", data);
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
    return { success: true }
  } catch (error) {
    dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error.response?.data?.message || error.message });
    return { success: false }
  }
};

// Fetch Rides
export const fetchRides = (userId,token) => async (dispatch) => {
  // console.log("data from action ", userId,token)
  dispatch({ type: FETCH_RIDES_REQUEST });
  try {
    const { data } = await axios.get(`${API_BASE_URL}/rides/my-rides`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("data response from action", data);
    dispatch({ type: FETCH_RIDES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_RIDES_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

// Create Ride
export const createRide = (rideData, token) => async (dispatch) => {
  dispatch({ type: CREATE_RIDE_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URL}/rides`, rideData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    dispatch({ type: CREATE_RIDE_SUCCESS, payload: data });
    return {success:true}
  } catch (error) {
    dispatch({ type: CREATE_RIDE_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

// Fetch Matches
export const fetchMatches = (token) => async (dispatch) => {
  dispatch({ type: FETCH_MATCHES_REQUEST });
  try {
    const { data } = await axios.get(`${API_BASE_URL}/matches`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("data match from action.js ", data)
    dispatch({ type: FETCH_MATCHES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_MATCHES_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

export const logout = () => (dispatch) => {
  localStorage.setItem("token", "");
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT })
}
