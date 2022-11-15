import { useState, useEffect, useRef, useId } from "react"
import { EmployeeActionKind } from "../../reducer";
import { StyledContainer, StyledInput } from "../../ui/Input/Input.styles";
import { StyledLabel } from "../Select/Select.styles";
import { StyledDatePickerContainer } from "./DatePicker.styles";
import { DatePickerHeader } from "./DatePickerHeader";
import { DatePickerTable } from "./DatePickerTable";
import { getMonthValue, formatDayAndMonth, isValidInputFormat } from "./utils";

type DatePickerProps = {
  label: string;
  onChange: (type: EmployeeActionKind, payload: string) => void;
  action: EmployeeActionKind;
}

export const Datepicker = ({ label, onChange, action }: DatePickerProps) => {

  const [showPicker, setShowPicker] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [input, setInput] = useState('');
  const pickerContainerRef = useRef<HTMLDivElement | null>(null);
  const id = useId();

  function handleMonthChange(value: number) {
    const month = getMonthValue(selectedMonth, value);
    setSelectedMonth(month);

    if (value === -1) {
      setSelectedYear(prev => selectedMonth === 0 ? prev - 1 : prev);
    } else if (value === 1) {
      setSelectedYear(prev => selectedMonth === 11 ? prev + 1 : prev);
    }
  }

  function resetToToday() {
    updateFullDate();
    const today = new Date().toLocaleDateString('en-US');
    updateInput(today);
  }

  function handleCellClick(day: number, isCurrentMonthValue: boolean) {
    const monthChange = day >= 23 ? -1 : 1;
    if (!isCurrentMonthValue) {
      handleMonthChange(monthChange);
    }
    const currentMonth = isCurrentMonthValue ? selectedMonth : getMonthValue(selectedMonth, monthChange);
    const newDate = new Date(selectedYear, currentMonth, day).toLocaleDateString('en-US');
    updateInput(newDate);
    setSelectedDay(day);
    setShowPicker(false);
  }

  /**
   * Updates all 3 states for the date. If args are left undefined, the format is the current day.
   */
  function updateFullDate(year?: number, month?: number, day?: number) {
    setSelectedDay(day || new Date().getDate());
    setSelectedMonth(month || new Date().getMonth());
    setSelectedYear(year || new Date().getFullYear());
  }

  /**
   * Format date arg to MM/DD/YYYY before state change
   * The only function that calls onChange function should be this one
   */
  function updateInput(date: string) {
    const formatedDate = formatDayAndMonth(date);
    setInput(formatedDate);
    onChange(action, formatedDate);
  }

  function formatValueOnBlur() {
    if (input === "") {
      return;
    }
    if (!isValidInputFormat(input)) {
      resetToToday();
      return;
    }
    const date = input.split('/').map(entry => Number(entry));
    const isAbrigedYear = date[2].toString().length === 2;
    date[2] += isAbrigedYear ? 2000 : 0;
    const newInput = date.join('/');
    updateFullDate(date[2], date[0] - 1, date[1]);
    updateInput(newInput);
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (showPicker && e.key === "Tab") {
        onCancel();
      }
    }

    function handleCloseOnClickOutside(e: MouseEvent) {
      const clickedOnChild = pickerContainerRef.current?.contains((e.target as HTMLElement));
      if (!clickedOnChild) {
        onCancel();
      }
    }

    function onCancel() {
      const splitInput = input.split('/').map(entry => Number(entry));
      if (splitInput.length === 3) {
        setSelectedMonth(splitInput[0] - 1);
        setSelectedYear(splitInput[2]);
      }
      setShowPicker(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleCloseOnClickOutside)

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleCloseOnClickOutside)
    }
  }, [showPicker, input])

  return (
    <StyledContainer style={{ position: 'relative' }} ref={pickerContainerRef}>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <StyledInput
        id={id}
        value={input}
        type="text"
        onInput={(e) => setInput((e.target as HTMLInputElement).value)}
        onFocus={() => setShowPicker(true)}
        onClick={() => setShowPicker(true)}
        onBlur={formatValueOnBlur}
      />
      {showPicker && (
        <StyledDatePickerContainer>
          <DatePickerHeader
            focusToday={resetToToday}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            setSelectedMonth={setSelectedMonth}
            setSelectedYear={setSelectedYear}
          />
          <DatePickerTable
            handleCellClick={handleCellClick}
            selectedDay={selectedDay}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
          />
        </StyledDatePickerContainer>
      )}
    </StyledContainer>
  )
}
