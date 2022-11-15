import { useMemo } from 'react';
import { DAYS } from "../../constants"
import { StyledPickerHeaderCell, StyledPickerTable } from "./DatePicker.styles"
import { DatePickerCell } from "./DatePickerCell"
import { getDaysMap, isCurrentMonthValue } from "./utils";

type DatePickerTableProps = {
  handleCellClick: (day: number, isCurrentMonthValue: boolean) => void;
  selectedDay: number;
  selectedYear: number;
  selectedMonth: number;
}

export const DatePickerTable = ({ handleCellClick, selectedDay, selectedYear, selectedMonth }: DatePickerTableProps) => {

  const displayedMonth = useMemo(() => getDaysMap(selectedYear, selectedMonth), [selectedYear, selectedMonth]);

  return (
    <StyledPickerTable>
      <thead>
        <tr>
          {DAYS.map(day => (
            <StyledPickerHeaderCell key={`day-key-${day}`}>{day}</StyledPickerHeaderCell>
          ))}
        </tr>
      </thead>
      <tbody>
        {displayedMonth.map((row, rowIndex) => (
          <tr key={`picker-line-${rowIndex}`}>
            {row.map((day, colIndex) => (
              <DatePickerCell
                key={`day-${day}-${colIndex}-${rowIndex}`}
                value={day}
                onClick={handleCellClick}
                isCurrentMonthValue={isCurrentMonthValue(rowIndex, day, displayedMonth)}
                selectedDay={selectedDay}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </StyledPickerTable>

  )
}