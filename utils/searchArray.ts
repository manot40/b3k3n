export function searchArray<T = {}>(arr: T[], field: keyof T, search = ''): T[] {
  const criteria = new RegExp(search, 'i');
  return arr.filter(item => criteria.test(item[field] as unknown as string));
}
