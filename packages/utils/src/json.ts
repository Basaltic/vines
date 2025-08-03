export function safelyParseJSON(jsonStr: string) {
    try {
        return JSON.parse(jsonStr);
    } catch (e) {}

    return undefined;
}
