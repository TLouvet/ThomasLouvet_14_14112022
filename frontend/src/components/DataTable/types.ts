export type DataTableFooterProps = {
  startingEntry: number;
  totalEntries: number;
  rowsPerPage: number;
  currentPage: number;
  totalFilteredEntries: number;
  setCurrentPage: (value: number) => void;
}

export type DataTableBodyProps = {
  columns: ColumnHeader[];
  data: any[];
  startingEntry: number;
  maxEntry: number;
  sortColumn: string;
}

export type DataTableHeaderProps = {
  columns: ColumnHeader[];
  currentSortColumn: string;
  currentSortDirection: string;
  handleColumnSort: (name: string) => void;
}

export type DataTableFilterProps = {
  selectOptions: number[];
  filter: string;
  setEntriesPerPage: (n: number) => void;
  setFilter: (s: string) => void;
}

export type DataTableType = 'string' | 'number' | 'boolean' | 'date';

export type ColumnHeader = {
  headerName: string;
  param: string;
  type: DataTableType;
}

export type DataTableProps = {
  columns: ColumnHeader[]; // Columns titles
  data: any[];
  rowsPerPageOptions?: number[];
}

export type TableSortState = "up" | "down";

export type PaginationProps = {
  maxPage: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
}