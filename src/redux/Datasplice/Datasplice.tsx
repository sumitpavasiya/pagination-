
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';




export const fetchdata = createAsyncThunk('fetchdata', (page: number) => {
    // console.log(page);

    // return axios.get(`${API_POST_URL}`)
    return axios.get(`${import.meta.env.VITE_APP_API_URL}?_page=${page}&_limit=10`)
        .then(res => (
            res.data
        ))
        .catch(error => {
            throw console.log(error);
        });
});

export const fullfetchdata = createAsyncThunk('fullfetchdata', () => {


    return axios.get(import.meta.env.VITE_APP_API_URL)
        .then(res => (
            res.data
        ))
        .catch(error => {
            throw console.log(error);
        });
});

interface Data {
    userId: number;
    id: number;
    title: string;
    body: string
}


interface Postsatate {
    list: Data[];
    fulldata: Data[];
    loading: boolean;
    error: string | null;
}


const initialState: Postsatate = {
    list: [],
    fulldata: [],
    loading: false,
    error: null,
};


const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchdata.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchdata.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchdata.rejected, (state, action) => {
                state.loading = false;
                console.log(state.error)
            })
            .addCase(fullfetchdata.fulfilled, (state, action) => {
                state.loading = false;
                state.fulldata = action.payload;
            })
    },
});

export default postSlice.reducer;
