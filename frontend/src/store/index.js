import { configureStore } from "@reduxjs/toolkit";
import music from "../reducers/music";
import player from "../reducers/player";

const store = configureStore({
    reducer: {music, player},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;