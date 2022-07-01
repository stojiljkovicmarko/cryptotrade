import { createSlice } from "@reduxjs/toolkit";

const initState = {
  favorites: [],
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: initState,
  reducers: {
    addFavorite(state, action) {
      const isFavorite = state.favorites.includes(action.payload);
      if (!isFavorite) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite(state, action) {
      state.favorites = state.favorites.filter(
        (symbol) => symbol !== action.payload
      );
    },
    replaceFavorites(state, action) {
      state.favorites = action.payload;
    },
    isFavorite(state, action) {
      return;
    },
  },
});

export const favoritesReducer = favoriteSlice.reducer;
export const favoritesActions = favoriteSlice.actions;
export default favoriteSlice;
