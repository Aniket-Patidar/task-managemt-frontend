import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks: [],
    task: {},
    loading: false,
    error: null,
};


const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {

        setTasks: (state, action) => {
            state.tasks = action.payload;
            state.loading = false;
            state.error = null;
        },
        setTask: (state, action) => {
            state.task = action.payload;
            state.loading = false;
            state.error = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
            state.error = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});


export const { setTasks, setLoading, setError } = taskSlice.actions;

export default taskSlice.reducer;
