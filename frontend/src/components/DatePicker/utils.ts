import { MAX_PICKER_YEAR, MIN_PICKER_YEAR } from "../../constants";

export function getDaysMap(selectedYear: number, selectedMonth: number) {
  const lastDayOfMonth = new Date(selectedYear, selectedMonth + 1, 0);
  const previousMonthDays = getPreviousMonthDays(selectedYear, selectedMonth);
  const currentMonthDays = getCurrentMonthDays(lastDayOfMonth);
  const nextMonthStartDays = getNextMonthDays(lastDayOfMonth);
  const formattedArray = getFormatedArray([...previousMonthDays, ...currentMonthDays, ...nextMonthStartDays])
  return formattedArray;
}

/**
 * Return array containing days of the previous month that need to be included on the current month datepicker
 * It will fill part of the first line on the picker.
 * @param year - picker selected year
 * @param month  - picker selected month
 */
function getPreviousMonthDays(year: number, month: number): number[] {

  const firstDayOfMonth = new Date(year, month, 1);
  const firstDayAsWeekDay = firstDayOfMonth.getDay();
  return Array(firstDayAsWeekDay)
    .fill(0)
    .map((_, i) => (
      Number(
        new Date(year, month, 1 - i)
          .toISOString()
          .split('T')[0]
          .split('-')[2]
      ))
    )
    .reverse();
}

function getCurrentMonthDays(lastDayOfMonth: Date) {
  const numberOfDaysInCurrentMonth = lastDayOfMonth.getDate();
  return Array(numberOfDaysInCurrentMonth).fill(0).map((_, i) => i + 1);
}

function getNextMonthDays(lastDayOfMonth: Date) {
  const lastDayAsWeekDay = lastDayOfMonth.getDay();
  return Array(6 - lastDayAsWeekDay).fill(0).map((_, i) => i + 1);
}

/**
 * Creates a 2D matrix where each row has 7 column entries with each column corresponding to one day of the week.
 * Number of rows is calculated with the number of elements inside flatArray.
 * Note that flatArray length must be a multiple of 7 for this function to work
 * @param flatArray 
 * @returns 
 */
function getFormatedArray(flatArray: number[]): number[][] {
  if (flatArray.length % 7 !== 0) {
    throw new Error("Error while trying to format the array. The length of flatArray should be a multiple of 7");
  }

  const matrixSize = flatArray.length / 7;
  return (
    Array(matrixSize)
      .fill(0)
      .map((_, i) => (
        Array(7)
          .fill(0)
          .map((_, j) => flatArray[i * 7 + j])
      ))
  )
}

export function formatDayAndMonth(date: string) {
  const splitDate = date.split('/');
  splitDate[0] = formatWithTwoDigits(splitDate[0]);
  splitDate[1] = formatWithTwoDigits(splitDate[1]);
  return splitDate.join('/');
}

function formatWithTwoDigits(value: string) {
  return value.length < 2 ? `0${value}` : value.slice(-2);
}

export function isCurrentMonthValue(rowIndex: number, entry: number, displayedMonth: number[][]) {
  return (
    (rowIndex === 0 && entry <= 7) ||
    (rowIndex === displayedMonth.length - 1 && entry >= 22) ||
    (rowIndex > 0 && rowIndex < displayedMonth.length - 1)
  )
}

export function getMonthValue(selectedMonth: number, monthChange: number) {

  if (selectedMonth + monthChange > 11) {
    return 0;
  }
  if (selectedMonth + monthChange < 0) {
    return 11;
  }

  return selectedMonth + monthChange;
}

/**
 * Formate date 
 * @param date 
 * @returns 
 */
export function isValidInputFormat(date: string) {
  const splitDate = date
    .split('/')
    .map(entry => Number(entry));

  if (splitDate.length !== 3) {
    return false;
  }
  const validMonth = isInRange(splitDate[0], 1, 12);
  const validYear = isInRange(splitDate[2], MIN_PICKER_YEAR, MAX_PICKER_YEAR) || splitDate[2].toString().length === 2;
  if (!validMonth || !validYear) {
    return false;
  }

  // Ici on vérifie si c'est un jour valide, mais pour ça j'ai besoin que l'année soit valide + le mois 

  return true;
}

function isInRange(value: number, min: number, max: number) {
  return value >= min && value <= max;
}