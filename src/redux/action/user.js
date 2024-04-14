import axios from 'axios';
import { setLoading, setError, setToken, setStudent } from '../sclice/user';

export const authenticateJWT = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const { data } = await axios.post(`${basePath}/jwt`);
        await localStorage.setItem('token', data.token);
        dispatch(setStudent(data.user));
    } catch (error) {
        console.error("JWT Authentication Error:", error);
        dispatch(setError("JWT Authentication failed"));
    } finally {
        dispatch(setLoading(false));
    }
};

export const loginUser = (userData) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const { data } = await axios.post(`${basePath}/login`, userData);
        await localStorage.setItem('token', data.token);
        dispatch(setStudent(data.user));
    } catch (error) {
        console.error("Login Error:", error);
        dispatch(setError(error?.response?.data?.message || "Login failed"));
    } finally {
        dispatch(setLoading(false));
    }
};

export const signupUser = (userData) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const { data } = await axios.post(`${basePath}/signup`, userData);
        await localStorage.setItem('token', data.token);
        dispatch(setStudent(data.user));
    } catch (error) {
        console.error("Signup Error:", error);
        dispatch(setError(error?.response?.data?.message || "Signup failed"));
    } finally {
        dispatch(setLoading(false));
    }
};

export const logoutUser = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        await axios.get(`${basePath}/logout`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        });
        await localStorage.removeItem('token');
        dispatch(setToken(null));
        dispatch(setStudent(null));
    } catch (error) {
        console.error("Logout Error:", error);
        dispatch(setError("Logout failed"));
    } finally {
        dispatch(setLoading(false));
    }
};

export const uploadAvatar = (avatarData) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const { data } = await axios.post(`${basePath}/upload-avatar`, avatarData, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        });
        dispatch(setStudent(data.user));
    } catch (error) {
        console.error("Upload Avatar Error:", error);
        dispatch(setError(error?.response?.data?.message || "Failed to upload avatar"));
    } finally {
        dispatch(setLoading(false));
    }
};

export const forgotPassword = (emailData) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const { data } = await axios.post(`${basePath}/forgot-password`, emailData, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        });
        console.log("Forgot Password Success:", data.message);
    } catch (error) {
        console.error("Forgot Password Error:", error);
        dispatch(setError(error?.response?.data?.message || "Forgot password failed"));
    } finally {
        dispatch(setLoading(false));
    }
};