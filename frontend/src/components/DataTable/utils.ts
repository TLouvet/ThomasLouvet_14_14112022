export function filterData(filter: string, data: any[]) {
  const lowercaseFilter = filter.toLowerCase();
  return data.filter((entry: any) => {
    for (const key in entry) {
      if (!entry[key]) {
        continue;
      }
      const lwcVal = entry[key].toString().toLowerCase();
      if (lwcVal.includes(lowercaseFilter)) {
        return entry;
      }
    }
    return null;
  })
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