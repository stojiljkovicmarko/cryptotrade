import styles from "./Table.module.css";

const TableDetails = ({ colNames, symbol, currencyPair }) => {
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
        <tr key={symbol}>
          <td className={styles.name}>{symbol}</td>
          <td>{currencyPair[0]}</td>
          <td>{currencyPair[1]}</td>
          <td>{currencyPair[2]}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableDetails;
