import styled from "@emotion/styled";

export const StyledGroupContainer = styled.div`
  display: flex; 
  column-gap: 30px; 
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 599px){
    display: unset;
  }
`;