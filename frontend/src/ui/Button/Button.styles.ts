import styled from "@emotion/styled";
import { TextAlignment } from "./Button";

export const StyledContainer = styled.div<{ align?: TextAlignment }>`
  text-align: ${props => props.align || 'start'};
`;

export const StyledButton = styled.button`
  padding: 10px 15px;
  border: none;
  background-color: black;
  color: white;
  font-size: 16px;
  font-weight: 700;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    color: black;
    background-color: transparent;
    border: 1px solid black;
  }
`;