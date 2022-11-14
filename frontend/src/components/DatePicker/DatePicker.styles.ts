import styled from "@emotion/styled";

export const StyledDatePickerContainer = styled.div`
  padding: 10px;
  border: 1px solid rgba(100,100,100,0.5);
  margin-bottom: 30px;
  position: absolute;
  z-index: 1000;
  background: white; 
  box-shadow: 0 5px 15px -5px rgb(0 0 0 / 75%);
`;

export const StyledHeaderContainer = styled.div`
  display: flex; 
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const StyledPickerButton = styled.button`
  background: transparent;
  border: none; 
  cursor: pointer;
  border-radius: 5px;

  &:hover{
    background-color: rgba(100,100,100,0.2);
  }
`;

export const StyledButtonImage = styled.img`
  width: 15px;
`;

export const StyledSelect = styled.select`
  border: none;
  padding: 1px 3px;
  text-align: right;
  font-weight: 700;
  cursor: pointer;
  &:hover{
    text-decoration: underline;
  }
`;

export const StyledOption = styled.option`
  font-weight: 700;
`;

export const StyledPickerTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const StyledPickerHeaderCell = styled.th`
  font-weight: 700;
  text-align: center;
  color: #999;
  cursor: default;
  border: 1px solid #ddd;
  background: #f1f1f1;
  height: 25px;
  font-size: 12px;
`;


export const StyledMonthCell = styled.td<{ selectedDay: string, isCurrentMonthCell: string }>`
  background: ${props => props.selectedDay === "true" ? "#33aaff" : "#f5f5f5"};
  border: 1px solid #ddd;
  color: ${props => props.selectedDay === "true" ? "white" : "black"};
  font-size: 12px;
  text-align: right;
  vertical-align: middle;
  padding: 1px 5px;
  border-collapse: collapse;
  cursor: ${props => props.isCurrentMonthCell === "true" ? "pointer" : "default"};
  height: 25px;
  font-weight: ${props => props.selectedDay === "true" ? 700 : 500};
  opacity: ${props => props.isCurrentMonthCell === "true" ? 1 : 0.5};

  &:hover{
    color: white;
    background: #ff8000;
  }
`;

