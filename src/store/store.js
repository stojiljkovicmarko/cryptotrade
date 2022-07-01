import { configureStore } from "@reduxjs/toolkit";
import { favoritesReducer } from "./favoritesSlice.js";

import { symbolsReducer } from "./symbolsSlice.js";

const store = configureStore({
  reducer: {
    symbols: symbolsReducer,
    favorites: favoritesReducer,
  },
});

export default store;
