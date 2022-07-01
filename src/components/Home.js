import { COL_NAMES_HOME } from "../constants/constants";

import Table from "../ui/Table";



const Home = ({symbols, pairs}) => {
  
  return (
    <main>
      <Table colNames={COL_NAMES_HOME} symbols={symbols} pairs={pairs} />
    </main>
  );
};

export default Home;
