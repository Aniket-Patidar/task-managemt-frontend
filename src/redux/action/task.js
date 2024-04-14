import { setError, setLoading, setTasks } from "../sclice/task";
import axios from 'axios';
const basePath = `${process.env.NEXT_PUBLIC_URl}/task`

export const fetchAllTasks = (searchText, page = 1, limit = 10) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const { data } = await axios.get(`${basePath}`, {
            params: {
                search: searchText,
                page: page,
                limit: limit
            },
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });
        dispatch(setTasks(data.tasks));
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const createNewTask = (taskData) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.post(`${basePath}`, taskData, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        });
        dispatch(fetchAllTasks())
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const deleteTaskById = (taskId) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const { data } = await axios.delete(`${basePath}/${taskId}`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        });
        dispatch(fetchAllTasks());
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const updateTaskById = (taskId, taskData) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.put(`${basePath}/${taskId}`, taskData, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        });
        dispatch(fetchAllTasks());
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const fetchTaskById = (taskId) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${basePath}/${taskId}`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        });
        dispatch(setTask(response.data.task));
    } catch (error) {
        dispatch(setError(error.message));
    }
};
