import { StyledMonthCell } from "./DatePicker.styles";

type DatePickerCellProps = {
  value: number;
  onClick: (value: number, isCurrentMonthValue: boolean) => void;
  isCurrentMonthValue: boolean;
  selectedDay: number;
}

export const DatePickerCell = ({ value, onClick, isCurrentMonthValue, selectedDay }: DatePickerCellProps) => {
  const isCurrentSelectedDay = isCurrentMonthValue && selectedDay === value;

  return (
    <StyledMonthCell
      selectedDay={isCurrentSelectedDay.toString()}
      isCurrentMonthCell={isCurrentMonthValue.toString()}
      onClick={() => onClick(value, isCurrentMonthValue)}
    >
      {value}
    </StyledMonthCell>
  )
}