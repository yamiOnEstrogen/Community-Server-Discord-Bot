import { escapeRegExp } from "./tools";

/**
 * UwUify a string
 * @param text The text to UwUify
 * @param includeExtraUwuEmojis Whether to include extra uwu emojis
 * @returns The UwUified text
 * @example
 * const uwu = UwU("Hello, world!");
 * console.log(uwu);
 * // Output: Hewwo, wowwd! (◕‿◕✿)
 */
export function UwU(text: string, includeExtraUwuEmojis: boolean = true): string {
    const kawaiiEmojis = ["(◕‿◕✿)", "(｡♥‿♥｡)", "(づ｡◕‿‿◕｡)づ", "(/^.^)/", "ʕっ•ᴥ•ʔっ", "(*^‿^*)", "🌸", "🐰", "❤", "🥺"];
    const specialChars: { [key: string]: string } = {
        "r": "w",
        "l": "w",
        "R": "W",
        "L": "W",
        "v": "vw",
        "V": "VW",
    };
    const extraUwuEmojis = ["(・`ω´・)", ";;w;;", "UwU", ">w<", "owo", "^w^"];

    let uwuText = text;

    // Escape kawaiiEmojis before using them in regular expressions
    const escapedKawaiiEmojis = kawaiiEmojis.map(escapeRegExp);

    // Replace regular text with kawaii emojis
    for (const emoji of escapedKawaiiEmojis) {
        const regex = new RegExp(`\\b${emoji}\\b`, "g");
        uwuText = uwuText.replace(regex, emoji);
    }

    // Replace special characters
    for (const char in specialChars) {
        const regex = new RegExp(char, "g");
        uwuText = uwuText.replace(regex, specialChars[char]);
    }

    // Convert 'you' to 'u'
    uwuText = uwuText.replace(/\b(you)\b/gi, "u");

    // Convert '!?' to '?! uwu'
    uwuText = uwuText.replace(/\!\?/g, "?! uwu");

    // Convert '?' to '?? uwu'
    uwuText = uwuText.replace(/\?/g, "?? uwu");

    // Add random extra uwu emoji if includeExtraUwuEmojis is true
    if (includeExtraUwuEmojis) {
        const randomUwuEmoji = extraUwuEmojis[Math.floor(Math.random() * extraUwuEmojis.length)];
        uwuText += ` ${randomUwuEmoji}`;
    }

    return uwuText;
}