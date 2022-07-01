import { createSlice } from "@reduxjs/toolkit";

const initState = {
  symbols: [],
};

const symbolsSlice = createSlice({
  name: "symbols",
  initialState: initState,
  reducers: {
    replaceSymbols(state, action) {
      state.symbols = action.payload;
    },
  },
});

export const symbolsReducer = symbolsSlice.reducer;
export const symbolsActions = symbolsSlice.actions;
export default symbolsSlice;
