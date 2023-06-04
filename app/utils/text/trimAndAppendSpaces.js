export function trimAndAppendSpaces(oldText, newText) {
    const leadingSpaces = oldText.match(/^\s+/);
    const trailingSpaces = oldText.match(/\s+$/);

    return (
        (leadingSpaces ? leadingSpaces[0] : "") +
        newText +
        (trailingSpaces ? trailingSpaces[0] : "")
    );
}
