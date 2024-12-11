export default (input: string): string => {
  return input
    .replace(/^\//, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};
