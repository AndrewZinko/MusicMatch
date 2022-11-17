import {
    createSlice,
    createAsyncThunk,
    createSelector
} from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";

export const fetchCurrentTrack = createAsyncThunk(
    'player/fetchCurrentTrack',
    async (data) => {
        const {request} = useHttp();
        return await request("https://musicmatchbackend.herokuapp.com/musicUrl", "POST", JSON.stringify(data));
    }
);

const initialState = {
    trackData: {},
    trackUrl: "",
    playStatus: false,
    trackUrlLoadingStatus: 'idle',
    playerStatus: "uninit"
}

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        dropPlayer: (state) => {state.playerStatus = 'uninit';},
        togglePlayStatus: (state, action) => {state.playStatus = action.payload;},
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
    dropPlayer,
    togglePlayStatus,
    addTrackToPlayer
} = actions;