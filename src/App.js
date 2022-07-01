import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { favoritesActions } from "./store/favoritesSlice";
import { fetchSymbols } from "./store/symbolsThunk";
import { socketConnect } from "./ws/wsconnect";
import { loadFavFromStorage } from "./store/favoritesStorage";

import Header from "./components/Header";
import Home from "./components/Home";
import Details from "./components/Details";
import Favorites from "./components/Favorites";

import Maintenance from "./ui/Maintenance";
import "./App.css";

const emptyPair = Array(5).fill("0");

function App() {
  const [platformOperative, setPlatformOperative] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch("/v2/platform/status");
        const data = await response.json();
        Array.from(data)[0] === 1
          ? setPlatformOperative(true)
          : setPlatformOperative(false);
      } catch (error) {
        console.log(error);
      }
    };

    checkStatus();
  }, []);

  useEffect(() => {
    const value = localStorage.getItem("loggedIn");
    value && setLoggedIn(value);

    let favorites = loadFavFromStorage();
    if (favorites) {
      dispatch(favoritesActions.replaceFavorites(favorites));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSymbols());
  }, [dispatch]);

  const [connectionStatus, setConnectionStatus] = useState(true);
  const symbols = useSelector((state) => state.symbols.symbols);

  const [btcusd, setBtcusd] = useState(emptyPair);
  const [ltcusd, setLtcusd] = useState(emptyPair);
  const [ltcbtc, setLtcbtc] = useState(emptyPair);
  const [ethusd, setEthusd] = useState(emptyPair);
  const [ethbtc, setEthbtc] = useState(emptyPair);

  const pairs = [btcusd, ltcusd, ltcbtc, ethusd, ethbtc];

  useEffect(() => {
    socketConnect({
      connectionStatus,
      setConnectionStatus,
      setBtcusd,
      setLtcusd,
      setLtcbtc,
      setEthusd,
      setEthbtc,
    });
  }, [connectionStatus]);

  if (!platformOperative) {
    return <Maintenance />;
  }

  return (
    <>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route
          path="/home"
          element={<Home symbols={symbols} pairs={pairs} />}
        />
        <Route
          path="/favorites"
          element={
            loggedIn ? (
              <Favorites symbols={symbols} pairs={pairs} />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route path="/details/:pair" element={<Details />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </>
  );
}

export default App;
