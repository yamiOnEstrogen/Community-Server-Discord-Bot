/**
 * Escape a string to be used in a regular expression.
 * @param text
 * @returns The escaped string
 * @example
 * const escaped = escapeRegExp("Hello, world!");
 * console.log(escaped);
 * // Output: Hello, world\!
 */

export function escapeRegExp(text: string) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

/**
 * Parse a mention
 * @param mention The mention to parse
 * @returns The id of the user
 * @example
 * const id = parseMention("<@1234567890>");
 * console.log(id);
 * // Output: 1234567890
 */
export function parseMention(mention: string) {
    const matches = mention.match(/^<@!?(\d+)>$/);
    if (!matches) return;
    const id = matches[1];
    return id;
}