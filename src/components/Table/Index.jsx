import Thead from "./Thead";
import Tbody from "./Tbody";
import Row from "./Row";
import Cell from "./Cell";

function Table({ children, thead }) {
  return (
    <div className="overflow-x-auto overflow-y-visible">
      <table className="min-w-full divide-y divide-gray-700">
        <Thead theads={thead} />
        <Tbody>{children}</Tbody>
      </table>
    </div>
  );
}

Table.Row = Row;
Table.Cell = Cell;

export default Table;
