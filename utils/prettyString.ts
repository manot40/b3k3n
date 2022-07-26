export function prettyString(sentence: string) {
  return sentence
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');
}
