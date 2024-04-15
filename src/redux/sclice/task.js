import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks: [],
    task: {},
    loading: false,
    error: null,
    paginationData: {
        
    }
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
        setTasks: (state, action) => {
            state.tasks = action.payload;
            state.loading = false;
            state.error = null;
        },
        setPaginationData: (state, action) => {
            state.paginationData = action.payload;
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


export const { setTasks, setLoading, setError,setPaginationData } = taskSlice.actions;

export default taskSlice.reducer;
