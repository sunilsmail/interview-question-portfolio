function tokenizeString(inputString) {
    const tokens = [];
    let token = '';
    let insideQuotes = false;

    for (let i = 0; i < inputString.length; i++) {
        const char = inputString[i];

        if (char === '"') {
            if (insideQuotes) {
                tokens.push('"' + token + '"');
                token = '';
            }
            insideQuotes = !insideQuotes;
        } else if (char === ' ' && !insideQuotes) {
            if (token !== '') {
                tokens.push(token);
                token = '';
            }
        } else {
            token += char;
        }
    }

    if (token !== '') {
        tokens.push(token);
    }

    return tokens;
}

// Example usage
const inputString = 'This is a "sample string" with "tokens enclosed" in quotes.';
const result = tokenizeString(inputString);
console.log(result);
