import { MONTHS, YEARS } from "../../constants"
import { StyledHeaderContainer, StyledOption, StyledSelect } from "./DatePicker.styles"
import home from '../../assets/home.png';
import back from '../../assets/back.png';
import next from '../../assets/next.png';
import { DatePickerButton } from "./DatePickerButton";
import { getMonthValue } from "./utils";

type DatePickerHeaderProps = {
  focusToday: () => void;
  selectedMonth: number;
  selectedYear: number;
  setSelectedYear: ((value: React.SetStateAction<number>) => void);
  setSelectedMonth: (value: React.SetStateAction<number>) => void;
}

export const DatePickerHeader = ({ focusToday, setSelectedMonth, selectedMonth, selectedYear, setSelectedYear }: DatePickerHeaderProps) => {

  function switchMonth(value: number) {
    const month = getMonthValue(selectedMonth, value);
    setSelectedMonth(month);

    if (value === -1) {
      setSelectedYear(prev => selectedMonth === 0 ? prev - 1 : prev);
    } else if (value === 1) {
      setSelectedYear(prev => selectedMonth === 11 ? prev + 1 : prev);
    }
  }

  return (
    <StyledHeaderContainer>
      <DatePickerButton src={back} onClick={() => switchMonth(-1)} />
      <DatePickerButton src={home} onClick={focusToday} />

      <StyledSelect
        onChange={(e) => setSelectedMonth(MONTHS.findIndex(el => el === e.target.value))}
        value={MONTHS[selectedMonth]}
      >
        {MONTHS.map(entry => <StyledOption key={entry} value={entry}>{entry}</StyledOption>)}
      </StyledSelect>

      <StyledSelect
        onChange={(e) => setSelectedYear(Number(e.target.value))}
        value={selectedYear}
      >
        {YEARS.map(entry => (
          <StyledOption key={`year-${entry}`} value={entry}>{entry}</StyledOption>
        ))}
      </StyledSelect>

      <DatePickerButton src={next} onClick={() => switchMonth(1)} />
    </StyledHeaderContainer>
  )
}