import { createSlice } from "@reduxjs/toolkit";

const initState = {
  currencyPairs: {
    btcusd: [],
    ltcusd: [],
    ltcbtc: [],
    ethusd: [],
    ethbtc: [],
  },
};

const currencyPairsSlice = createSlice({
  name: "currencyPairs",
  initialState: initState,
  reducers: {
    updateBtcusd(state, action) {
      state.btcusd = action.payload;
    },
  },
});

export const currencyPairsReducer = currencyPairsSlice.reducer;
export const currencyPairsActions = currencyPairsSlice.actions;
export default currencyPairsSlice;
