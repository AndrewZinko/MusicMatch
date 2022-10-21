import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";

export const fetchCurrentTrack = createAsyncThunk(
    'player/fetchCurrentTrack',
    async (data) => {
        const {request} = useHttp();
        return await request("http://127.0.0.1:8000/bands", "POST", JSON.stringify(data));
    }
);

const initialState = {
    trackData: {},
    trackUrl: "",
    trackUrlLoadingStatus: 'idle',
    playerStatus: "uninit"
}

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        addTrackToPlayer: (state, action) => {
            state.trackData = action.payload;
            state.playerStatus = "idle";
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCurrentTrack.pending, (state) => {state.trackUrlLoadingStatus = "loading"})
            .addCase(fetchCurrentTrack.fulfilled, (state, action) => {
                state.trackUrl = action.payload;
                state.trackUrlLoadingStatus = 'idle';
            })
            .addCase(fetchCurrentTrack.rejected, (state) => {state.trackUrlLoadingStatus = "error";})
            .addDefaultCase(() => {});
    }
});

const {reducer, actions} = playerSlice;

export default reducer;
export const {
    addTrackToPlayer
} = actions;