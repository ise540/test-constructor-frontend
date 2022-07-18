export default function dateToString(date: string): string {
  const typedDate = new Date(date);
  const stringDate = typedDate.toLocaleString("ru-RU", { timeZone: "UTC" });

  return stringDate;
}
