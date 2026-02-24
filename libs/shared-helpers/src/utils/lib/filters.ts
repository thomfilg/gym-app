export function filterNull<T>(data: (T | null | undefined)[]): T[] {
  return data.filter(item => item !== null && item !== undefined);
}
