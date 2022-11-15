import { StyledPaginationButton } from "./DataTable.styles"
import { PaginationProps } from "./types"
import { useMemo } from 'react';

export const PaginationNumberNavigation = ({ maxPage, currentPage, setCurrentPage }: PaginationProps) => {

  const normalizedCurrentPage = currentPage + 1;
  const pages = useMemo(formatArr, [maxPage, currentPage, normalizedCurrentPage]);

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
    const pages: any[] = [1]
    if (normalizedCurrentPage < 5 && maxPage > 6) {
      pages.push(2, 3, 4, 5, '. . .', maxPage);
    } else if (normalizedCurrentPage >= 5 && maxPage - currentPage <= 4) {
      pages.push(". . .", maxPage - 4, maxPage - 3, maxPage - 2, maxPage - 1, maxPage);
    } else if (normalizedCurrentPage >= 5 && maxPage - currentPage > 4) {
      pages.push(". . .", normalizedCurrentPage - 1, normalizedCurrentPage, normalizedCurrentPage + 1, ". . .", maxPage);
    }
    return pages;
  }

  return (
    <>
      {pages.map((page, i) => isNaN(Number(page))
        ? <span key={`dot-page-${i + 1}`}>{page}</span>
        : (
          <StyledPaginationButton
            selected={normalizedCurrentPage === page ? "t" : "f"}
            key={`btn-page-${i + 1}`}
            onClick={() => setCurrentPage(Number(page) - 1)}
          >
            {page}
          </StyledPaginationButton>
        )
      )}
    </>
  )
}