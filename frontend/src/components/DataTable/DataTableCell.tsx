import { DataTableType } from "./types";
import { formatDayAndMonth } from "./utils";

type DataTableCellProps = {
  value: number | string | boolean | Date;
  valueType: DataTableType;
  sortColumn: string;
  rowIndex: number;
  param: string;
}

const style = {
  evenSelected: { backgroundColor: 'rgba(0,0,0,0.08', padding: '20px' },
  oddSelected: { backgroundColor: 'rgba(0,0,0,0.05)', padding: '20px' },
} as const;


export const DataTableCell = ({ value, valueType, sortColumn, rowIndex, param }: DataTableCellProps) => {

  const isValidDate = valueType === "date" && value !== "";
  const formatedValue = isValidDate ? new Date(value as string).toLocaleDateString('en-US') : value;
  const displayedValue = isValidDate ? formatDayAndMonth(formatedValue as string) : formatedValue;

  return (
    <td
      style={param === sortColumn ? (rowIndex % 2 === 0 ? style.evenSelected : style.oddSelected) : { padding: "20px" }}
    >
      {displayedValue as string || ""}
    </td>
  )
}