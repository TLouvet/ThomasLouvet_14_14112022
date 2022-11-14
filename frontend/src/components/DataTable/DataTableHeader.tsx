import React from "react";
import { StyledHeaderCellContainer, StyledHeaderChevronContainer, StyledHeaderDownChevron, StyledHeaderUpChevron, StyledTableHeaderCell, StyledTableHeaderRow } from "./DataTable.styles";
import { DataTableHeaderProps } from "./types";

export const DataTableHeader = ({ columns, handleColumnSort, currentSortDirection, currentSortColumn }: DataTableHeaderProps) => {

  function handleKeyboard(e: React.KeyboardEvent, param: string) {
    if (e.key === "Enter") {
      handleColumnSort(param);
    }
  }

  return (
    <thead>
      <StyledTableHeaderRow>
        {columns.map(entry => {
          const displayDownChevron = (entry.param === currentSortColumn && currentSortDirection === "up").toString();
          const displayTopChevron = ((entry.param === currentSortColumn && currentSortDirection !== "up")).toString();
          return (
            <StyledTableHeaderCell key={`column-${entry.param}`} tabIndex={0} onKeyDown={(e) => handleKeyboard(e, entry.param)} onClick={() => handleColumnSort(entry.param)}>
              <StyledHeaderCellContainer>
                <span >{entry.headerName}</span>
                <StyledHeaderChevronContainer>
                  <StyledHeaderUpChevron display={displayTopChevron} />
                  <StyledHeaderDownChevron display={displayDownChevron} />
                </StyledHeaderChevronContainer>
              </StyledHeaderCellContainer>
            </StyledTableHeaderCell>
          )
        })}
      </StyledTableHeaderRow>
    </thead>
  )
}