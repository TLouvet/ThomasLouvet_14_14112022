import { StyledBodyRow, StyledTBody } from "./DataTable.styles";
import { DataTableCell } from "./DataTableCell";
import { DataTableBodyProps } from "./types";


export const DataTableBody = ({ data, columns, startingEntry, maxEntry, sortColumn }: DataTableBodyProps) => {
  return (
    <StyledTBody>
      {data.map((obj, Rindex) =>
        (Rindex >= startingEntry && Rindex < maxEntry) && (
          <StyledBodyRow key={`row-${Rindex}`}>
            {columns.map((entry, Cindex) => (
              <DataTableCell
                key={`${entry.param}-${Cindex}-col`}
                value={obj[entry.param] || ""}
                valueType={entry.type}
                sortColumn={sortColumn}
                rowIndex={Rindex}
                param={entry.param}
              />
            ))}
          </StyledBodyRow>
        )
      )}
    </StyledTBody>
  )
}