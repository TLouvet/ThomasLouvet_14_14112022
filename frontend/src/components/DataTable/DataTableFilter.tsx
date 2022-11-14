import { StyledFilterContainer, StyledFilterSelect } from "./DataTable.styles"
import { DataTableFilterProps } from "./types"

export const DataTableFilter = ({ selectOptions, filter, setEntriesPerPage, setFilter }: DataTableFilterProps) => {
  return (
    <StyledFilterContainer>
      <p>Show{' '}
        <StyledFilterSelect aria-label="select number of entries to show" onChange={(e) => setEntriesPerPage(Number(e.target.value))}>
          {selectOptions.map(entry => (
            <option key={`row-option-${entry}`} value={entry}>{entry}</option>
          ))}{' '}
        </StyledFilterSelect> entries
      </p>
      <p>Search: <input type="text" aria-label="Search bar" value={filter} onChange={(e) => setFilter(e.target.value)} /></p>
    </StyledFilterContainer>
  )
}   