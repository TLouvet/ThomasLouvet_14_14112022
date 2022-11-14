import { DataTableFooterProps } from "./types";
import { StyledPaginationButton, StyledTableFooterContainer } from "./DataTable.styles";
import { PaginationNumberNavigation } from "./PaginationNavigation";

export const DataTableFooter = ({ totalEntries, startingEntry, rowsPerPage, currentPage, totalFilteredEntries, setCurrentPage }: DataTableFooterProps) => {

  const endEntry = Math.min(totalFilteredEntries, startingEntry + rowsPerPage);
  const isFilteredData = totalEntries !== totalFilteredEntries;
  const displayedStartingEntry = totalFilteredEntries > 0 ? startingEntry + 1 : 0;
  const maxPage = Math.ceil(totalFilteredEntries / rowsPerPage);

  return (
    <StyledTableFooterContainer>
      <p>Showing {displayedStartingEntry} to {endEntry} of {totalFilteredEntries} entries {isFilteredData && `(filtered from ${totalEntries} total entries)`}</p>
      <div>
        <StyledPaginationButton
          selected="f"
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </StyledPaginationButton>

        <PaginationNumberNavigation
          maxPage={maxPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <StyledPaginationButton
          selected="f"
          disabled={endEntry === totalFilteredEntries}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </StyledPaginationButton>
      </div>
    </StyledTableFooterContainer>
  )
}