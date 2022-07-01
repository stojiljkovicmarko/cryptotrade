//HERE WE ARE FETCHING SYMBOLS

import { NUMBER_OF_SYMBOLS } from "../constants/constants";
import { symbolsActions } from "./symbolsSlice";

export const fetchSymbols = () => {
  return async (dispatch) => {
    const fetchSymbolsData = async () => {
      const response = await fetch("/v1/symbols");
      const data = response.json();
      return data;
    };

    try {
      let symbolsData = await fetchSymbolsData();
      if (!symbolsData) {
        symbolsData = [];
      }
      symbolsData = symbolsData.slice(0, NUMBER_OF_SYMBOLS);
      dispatch(symbolsActions.replaceSymbols(symbolsData));
    } catch (error) {
      console.log("Error fetching symbols: ", error);
    }
  };
};
