import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

import styles from "./Table.module.css";

const Table = ({ colNames, symbols, pairs }) => {
  const navigate = useNavigate();

  const showDetails = (pair) => {
    navigate(`/details/${pair}`);
  };

  if (!symbols || !pairs) {
    return <Loading />;
  }

  return (
    <table>
      <thead>
        <tr>
          {colNames.map((name, index) => (
            <th key={index}>{name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {symbols.map((symbol, index) => (
          <tr key={symbol}>
            <td className={styles.name}>
              <span onClick={() => showDetails(symbol)}>{symbol}</span>
            </td>
            {pairs[index].map((prop, index) => (
              <td key={index}>{prop}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
