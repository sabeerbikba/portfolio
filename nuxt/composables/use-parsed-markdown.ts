import { marked } from "marked";

/**
 * Converts a base64-encoded markdown string into sanitized HTML.
 *
 * - Decodes the base64 string to markdown.
 * - Parses markdown to HTML using `marked`.
 * - Adds `target="_blank"` and `rel="noopener noreferrer"` to all <a> tags.
 * - Fixes invalid structure like <a><p></p></a> by flattening into <a>content</a>.
 *
 * @param base64 - The base64-encoded markdown string.
 * @returns HTML string.
 */

export default (base64: string): string => {
  const markdown = atob(base64);
  const html = marked.parse(markdown, { async: false });

  const withAttrs = html.replace(
    /<a\s/g,
    '<a target="_blank" rel="noopener noreferrer" '
  );

  return withAttrs.replace(
    /<a([^>]+)>\s*<p>(.*?)<\/p>\s*<\/a>/gi,
    "<a$1>$2</a>"
  );
};
