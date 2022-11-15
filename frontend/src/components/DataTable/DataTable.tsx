import { useState, useMemo, useEffect } from "react";
import { StyledTable, StyledTableContainer } from "./DataTable.styles";
import { DataTableBody } from "./DataTableBody";
import { DataTableFilter } from "./DataTableFilter";
import { DataTableFooter } from "./DataTableFooter"
import { DataTableHeader } from "./DataTableHeader";
import { DataTableProps, TableSortState } from "./types";
import { filterData } from "./utils";

export const DataTable = ({ columns, data, rowsPerPageOptions }: DataTableProps) => {

  const [currentPage, setCurrentPage] = useState(0);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState(columns[0].param);
  const [sortDirection, setSortDirection] = useState<TableSortState>("up");
  const [filter, setFilter] = useState('');

  const startingEntry = currentPage * entriesPerPage;
  const maxEntry = startingEntry + entriesPerPage;
  const selectOptions = rowsPerPageOptions || [10, 16, 25, 50, 100];
  const filteredData = useMemo(() => filter === "" ? data : filterData(filter, data), [filter, data]);

  const compare = (e1: any, e2: any) => String(e1).localeCompare(String(e2));

  //Avoid recalculating if only changing page
  const sortedData = useMemo(
    () => filteredData.sort((a, b) => sortDirection === "up"
      ? compare(a[sortColumn], b[sortColumn]) :
      compare(b[sortColumn], a[sortColumn]))
    , [filteredData, sortColumn, sortDirection]
  );

  function handleColumnSort(name: string) {
    if (name !== sortColumn) {
      setSortColumn(name);
      setSortDirection('up');
    } else {
      setSortDirection(sortDirection === "up" ? "down" : "up");
    }
  }

  useEffect(() => {
    if (startingEntry > filteredData.length) {
      setCurrentPage(0);
    }
  }, [filteredData.length, startingEntry])

  return (
    <>
      {data.length > 0 && (
        <StyledTableContainer>
          <DataTableFilter
            selectOptions={selectOptions}
            filter={filter}
            setFilter={setFilter}
            setEntriesPerPage={setEntriesPerPage}
          />
          <StyledTable>
            <DataTableHeader
              columns={columns}
              currentSortColumn={sortColumn}
              currentSortDirection={sortDirection}
              handleColumnSort={handleColumnSort}
            />
            <DataTableBody
              data={sortedData}
              columns={columns}
              startingEntry={startingEntry}
              maxEntry={maxEntry}
              sortColumn={sortColumn}
            />
          </StyledTable>
          <DataTableFooter
            currentPage={currentPage}
            rowsPerPage={entriesPerPage}
            startingEntry={startingEntry}
            totalFilteredEntries={filteredData.length}
            totalEntries={data.length}
            setCurrentPage={setCurrentPage}
          />
        </StyledTableContainer>
      )}
    </>
  )
}