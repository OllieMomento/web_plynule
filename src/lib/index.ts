// place files you want to import through the `$lib` alias in this folder.

export type StylizedPart = {
    char: string;
    italic: boolean;
    index: number;
};

export const defaultItalicLetters: ReadonlySet<string> = new Set([
    'w',
    't',
    'i',
    'l',
    'g',
    'h',
    'b'
]);

export function stylizeHeading(
    text: string,
    letters: ReadonlySet<string> | string[] = defaultItalicLetters
): StylizedPart[] {
    const lowerSet: ReadonlySet<string> = Array.isArray(letters)
        ? new Set(letters.map((c) => c.toLowerCase()))
        : new Set(Array.from(letters).map((c) => c.toLowerCase()));

    return text.split('').map((ch, index) => ({
        char: ch,
        italic: lowerSet.has(ch.toLowerCase()),
        index
    }));
}
