import styled from "@emotion/styled";

export const StyledFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledFilterSelect = styled.select`
  margin-left: 6px;
`;

export const StyledTable = styled.table`
  border-collapse: collapse;
`

export const StyledTableHeaderRow = styled.tr`
  background-color: black;
  color: white;
`;

export const StyledTableHeaderCell = styled.th`
  padding: 15px 10px;
  text-align: center;
  cursor: pointer;
`;

export const StyledHeaderCellContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledHeaderChevronContainer = styled.div`
  margin-left: 5px;
`

export const StyledHeaderUpChevron = styled.div<{ display: string }>`
  margin: 0;
  margin-bottom: 1px;
  border: 5px solid transparent;
  border-bottom: 5px solid ${(props) => props.display === "true" ? "transparent" : 'white'};
`;

export const StyledHeaderDownChevron = styled.div<{ display: string }>`
  margin: 0;
  border: 5px solid transparent;
  border-top: 5px solid ${(props) => props.display === "true" ? "transparent" : 'white'};
`;

export const StyledPaginationButton = styled.button<{ selected: string }>`
  padding: 0.5em 1em;
  border: 1px solid #979797;
  background: ${(props) => props.selected === "t" ? "linear-gradient(to bottom, #fff 0%, #dcdcdc 100%)" : "transparent"};
  border: ${(props) => props.selected === "t" ? "1px solid grey" : "none"};
  min-width: 1.5em;
  margin-left: 2px;
  border-radius: 2px;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    border: ${(props) => props.selected !== "t" ? "1px solid #111" : "1px solid grey"};
    color: ${(props) => props.selected !== "t" ? "white" : "black"};
    background: ${(props) => props.selected !== "t" ? "linear-gradient(to bottom, #585858 0%, #111 100%)" : "linear-gradient(to bottom, #fff 0%, #dcdcdc 100%)"} ;
  }

  &:disabled {
    border: none;
    color: rgba(100,100,100,0.5);
    background: transparent;
    cursor: unset;
  }
`

export const StyledTableFooterContainer = styled.div`
  display: flex; 
  justify-content: space-between;
  align-items: baseline;
`;

export const StyledTBody = styled.tbody`
  border-bottom: 2px solid black;
  border-top: 1px solid black;
`;

export const StyledBodyRow = styled.tr`
  border-bottom: 1px solid rgba(0,0,0,0.2);
  &:nth-of-type(even){
    background-color: rgba(0,0,0,0.05);
  }

  &:nth-of-type(odd){
    background-color: #fff;
  }
`;

export const StyledTableBodyCell = styled.td`
  padding: 20px;
`;