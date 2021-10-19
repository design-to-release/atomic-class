export default function findStyle(code, cursor) {
    cursor = cursor || 0;
    if (!code) return [];
    code = code.substring(cursor);
    if (code.length == 0) return [];
    let matches = code.match(/<style(([\s\S])*?)<\/style>/);
    if (!matches) return [];
    const start = matches.index + cursor;
    const styleContent = matches[0];
    matches = code.match(/<style([\s\S]*)>([\s\S]*?)<\/([\s\S]*)style>/);
    const offset = '<style>'.length + matches[1].length;
    const innerHTML = matches[2];
    const rs = {
        start,
        content: styleContent,
        innerHTML,
        offset,
    };
    const next = findStyle(code, start + styleContent.length);
    return [rs, ...next];
}