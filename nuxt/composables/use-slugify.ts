/**
 * Composable to convert a string into a slug.
 *
 * - Trims leading/trailing spaces
 * - Converts to lowercase
 * - Replaces spaces and dots with hyphens
 *
 * @returns A function that slugifies a given string
 *
 * @example
 * const slugify = useSlugify();
 * slugify(" Hello.World test "); // "hello-world-test"
 */

export default (str: string): string =>
  str
    .trim()
    .toLowerCase()
    .replace(/[\s.]+/g, "-");
