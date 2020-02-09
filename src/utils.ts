export function fromYYYYMMDDToDate(id: string): Date {
  const year = id.substring(0, 4);
  const month = id.substring(4, 6);
  const day = id.substring(6, 8);

  return new Date(+year, +month - 1, +day);
}
