import { useSelector } from "react-redux";

import NoFavs from "../ui/NoFavs";

import { COL_NAMES_HOME } from "../constants/constants";

import Table from "../ui/Table";

const Favorites = ({ symbols, pairs }) => {
  const favorites = useSelector((state) => state.favorites.favorites);

  if (favorites.length === 0) {
    return <NoFavs />;
  }

  return (
    <main>
      <Table colNames={COL_NAMES_HOME} symbols={favorites} pairs={pairs} />
    </main>
  );
};

export default Favorites;
