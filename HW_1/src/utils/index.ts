export const getLastId = (data: number[]) => {
  if (!data.length) {
    return 1;
  }
  return data.reduce((a, b) => Math.max(a, b), 0) + 1;
};

export const getCommandName = (args: string[]) => args.slice(2)[0];

export const toDateString = (timestamp: number) => {
  return new Date(timestamp).toISOString().slice(0, 10);
};

export const getWeekYear = (timestamp: number) => {
  const d = new Date(timestamp);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const week1 = new Date(d.getFullYear(), 0, 4);
  const weekNumber = Math.floor(
    1 + ((d - week1) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7
  );
  return `${d.getFullYear()}-W${String(weekNumber).padStart(2, '0')}`;
};

export const getYearMonth = (timestamp: number) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // месяцы от 0 до 11
  return `${year}-${month}`;
};
