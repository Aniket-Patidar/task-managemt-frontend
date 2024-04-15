import axios from 'axios';
import { setLoading, setError, setToken, setUser } from '../sclice/user';
const basePath = `${process.env.NEXT_PUBLIC_URl}/user`

export const authenticateJWT = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const { data } = await axios.get(`${basePath}/jwt`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        });
        await localStorage.setItem('token', data.token);
        dispatch(setUser(data.user));
    } catch (error) {
        // dispatch(setError("JWT Authentication failed"));
    } finally {
        dispatch(setLoading(false));
    }
};

export const loginUser = (userData) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const { data } = await axios.post(`${basePath}/login`, userData);
        await localStorage.setItem('token', data.token);
        dispatch(setUser(data.user));
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
        dispatch(setUser(data.user));
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
        dispatch(setUser(null));
    } catch (error) {
        console.error("Logout Error:", error);
        dispatch(setError("Logout failed"));
    } finally {
        dispatch(setLoading(false));
    }
};

export const updateProfile = (fileData) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const formData = new FormData();
        formData.append('avatar', fileData);
        const { data } = await axios.post(`${basePath}/update-profile`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `${localStorage.getItem('token')}`
            }
        });
        dispatch(setUser(data.user));
    } catch (error) {
        console.error("upload image:", error);
        dispatch(setError(error?.response?.data?.message || "profile update failed"));
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
        dispatch(setUser(data.user));
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
    } catch (error) {
        console.error("Forgot Password Error:", error);
        dispatch(setError(error?.response?.data?.message || "Forgot password failed"));
    } finally {
        dispatch(setLoading(false));
    }
};
