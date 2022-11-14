import styled from "@emotion/styled";

export const StyledLabel = styled.label`
  font-weight: 600;
`;

export const StyledBox = styled.div`
  position: relative;
  width: fit-content;
  margin-bottom: 30px;
`;

export const StyledUnorderedList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0; 
`;

export const StyledListContainer = styled.div`
  position: absolute;
  top: 30px; 
  z-index: 1000; 
  background-color: white;
  width: 99%; 
  border: 1px solid #c5c5c5;
`;

export const StyledTextDisplay = styled.p`
  background-color: #f6f6f6;
  padding: 5px 25px 5px 15px;
  border: 1px solid #c5c5c5;
  border-radius: 6px;
  width: 14rem;
  font-family: Arial;
  margin-top: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow:hidden;
  position: relative;
`;

export const StyledDownChevron = styled.span`
  margin: 0;
  border: 5px solid transparent;
  border-top: 5px solid black;
  position: absolute;
  right: 10px;
  top: 12px;
`;

export const StyledListItem = styled.li<{ isCurrentSelected: string }>`
  border: ${({ isCurrentSelected }) => isCurrentSelected === 'true' ? '1px solid #003eff' : "none"};
  background-color: ${({ isCurrentSelected }) => isCurrentSelected === 'true' ? "#007fff" : "white"};
  font-size: 17px; 
  color: ${({ isCurrentSelected }) => isCurrentSelected === 'true' ? "white" : "black"};
  padding: 3px 1em 3px 0.4em; 
  outline: none; 
  cursor: pointer;
`;