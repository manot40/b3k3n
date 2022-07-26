export function qsFormat(query: { [key: string]: string | number }): string {
  return Object.keys(query)
    .map(key => `${key}=${query[key]}`)
    .join('&');
}
