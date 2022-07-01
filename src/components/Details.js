import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { favoritesActions } from "../store/favoritesSlice";

import { filterDetailProperties } from "../util/util";
import { COL_NAMES_DETAILS } from "../constants/constants";

import TableDetails from "../ui/TableDetails";

import styles from "./Details.module.css";
import Loading from "../ui/Loading";
import {
  loadFavFromStorage,
  saveFavToStorage,
} from "../store/favoritesStorage";

const Details = () => {
  const [currencyPair, setCurrencyPair] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  const favorites = useSelector((state) => state.favorites.favorites);
  const dispatch = useDispatch();

  const location = useLocation();
  const pathList = location.pathname.split("/");
  let symbol = pathList[pathList.length - 1];

  let isFavorite;
  if (favorites) {
    isFavorite = favorites.includes(symbol);
  }

  const handleAddToFavorites = () => {
    dispatch(favoritesActions.addFavorite(symbol));
    const loadedFavs = loadFavFromStorage();

    saveFavToStorage(loadedFavs.concat(symbol));
  };

  const handleRemoveFromFavorites = () => {
    dispatch(favoritesActions.removeFavorite(symbol));

    const loadedFavs = loadFavFromStorage();
    let newFavs;
    if (loadedFavs.includes(symbol)) {
      newFavs = loadedFavs.filter((smb) => smb !== symbol);
      saveFavToStorage(newFavs);
    }
  };

  useEffect(() => {
    const fetchPairInfo = async (symbol) => {
      const response = await fetch(`/v1/pubticker/${symbol}`);
      const data = await response.json();

      const filtered = filterDetailProperties(data);
      setCurrencyPair(filtered);
      setHasLoaded(true);
    };

    fetchPairInfo(symbol);
  }, [symbol]);

  if (!hasLoaded) {
    return <Loading />;
  }

  return (
    <main>
      <TableDetails
        colNames={COL_NAMES_DETAILS}
        symbol={[symbol]}
        currencyPair={currencyPair}
      />
      {isFavorite ? (
        <button
          className={`${styles.btn} ${styles.remove}`}
          onClick={handleRemoveFromFavorites}
        >
          REMOVE FROM FAVORITES
        </button>
      ) : (
        <button
          className={`${styles.btn} ${styles.add}`}
          onClick={handleAddToFavorites}
        >
          ADD TO FAVORITES
        </button>
      )}
    </main>
  );
};

export default Details;
