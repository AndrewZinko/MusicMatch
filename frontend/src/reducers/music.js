import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";

export const fetchMusic = createAsyncThunk(
    'music/fetchMusic',
    async (data) => {
        const {request} = useHttp();
        return await request("http://127.0.0.1:8000/bands", "POST", JSON.stringify(data));
    }
);

const initialState = {
    musicList: [],
    query: "",
    musicLoadingStatus: 'idle'
};

const musicSlice = createSlice({
    name: 'music',
    initialState,
    reducers: {
        musicAddQuery: (state, action) => {state.query = action.payload;}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMusic.pending, state => {state.musicLoadingStatus = 'loading';})
            .addCase(fetchMusic.fulfilled, (state, action) => {
                state.musicLoadingStatus = 'idle';
                state.musicList = action.payload;
            })
            .addCase(fetchMusic.rejected, state => {state.musicLoadingStatus = 'error';})
            .addDefaultCase(() => {});
    }
});

const {reducer, actions} = musicSlice;

export default reducer;
export const {
    musicAddQuery
} = actions;