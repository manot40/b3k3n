export function trimString(input: string, length = 32) {
  const trimmed = input.substring(0, length);
  const dots = input.length < length ? '' : '...';
  return trimmed + dots;
}
