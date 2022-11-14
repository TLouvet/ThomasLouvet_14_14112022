import { StyledPaginationButton } from "./DataTable.styles"
import { PaginationProps } from "./types"
import { useMemo } from 'react';

export const PaginationNumberNavigation = ({ maxPage, currentPage, setCurrentPage }: PaginationProps) => {

  const normalizedCurrentPage = currentPage + 1;
  const arr = useMemo(formatArr, [maxPage, currentPage, normalizedCurrentPage]);

  if (maxPage <= 6) {
    return (
      <>
        {Array(maxPage).fill(0).map((_, i) => (
          <StyledPaginationButton
            selected={normalizedCurrentPage === i + 1 ? "t" : "f"}
            key={`btn-page-${i + 1}`}
            onClick={() => setCurrentPage(i)}
          >
            {i + 1}
          </StyledPaginationButton>
        ))}
      </>
    );
  }


  /**
   * Format available pagination buttons on page change when 
   * enough pages need to be rendered
   */
  function formatArr() {
    if (maxPage <= 6) {
      return [];
    }
    const arr: any[] = [1]
    if (normalizedCurrentPage < 5 && maxPage > 6) {
      arr.push(2, 3, 4, 5, '. . .', maxPage);
    } else if (normalizedCurrentPage >= 5 && maxPage - currentPage <= 4) {
      arr.push(". . .", maxPage - 4, maxPage - 3, maxPage - 2, maxPage - 1, maxPage);
    } else if (normalizedCurrentPage >= 5 && maxPage - currentPage > 4) {
      arr.push(". . .", normalizedCurrentPage - 1, normalizedCurrentPage, normalizedCurrentPage + 1, ". . .", maxPage);
    }
    return arr;
  }

  return (
    <>
      {arr.map((entry, i) => isNaN(Number(entry))
        ? <span key={`dot-page-${i + 1}`}>{entry}</span>
        : (
          <StyledPaginationButton
            selected={normalizedCurrentPage === entry ? "t" : "f"}
            key={`btn-page-${i + 1}`}
            onClick={() => setCurrentPage(Number(entry) - 1)}
          >
            {entry}
          </StyledPaginationButton>
        )
      )}
    </>
  )
}