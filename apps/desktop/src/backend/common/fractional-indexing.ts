const INTEGER_ZERO = 'a0';
const SMALLEST_INTEGER = 'A00000000000000000000000000';

// `a` may be empty string, `b` is null or non-empty string.
// `a < b` lexicographically if `b` is non-null.
// no trailing zeros allowed.
// digits is a string such as '0123456789' for base 10.  Digits must be in
// ascending character code order!
function midpoint(a: string | null, b: string | null, digits: string): string {
    if (b !== null && a >= b) {
        throw new Error(a + ' >= ' + b);
    }
    if (a.slice(-1) === '0' || (b && b.slice(-1) === '0')) {
        throw new Error('trailing zero');
    }
    if (b) {
        // remove longest common prefix.  pad `a` with 0s as we
        // go.  note that we don't need to pad `b`, because it can't
        // end before `a` while traversing the common prefix.
        let n = 0;
        while ((a.charAt(n) || '0') === b.charAt(n)) {
            n++;
        }
        if (n > 0) {
            return b.slice(0, n) + midpoint(a.slice(n), b.slice(n), digits);
        }
    }
    // first digits (or lack of digit) are different
    const digitA = a ? digits.indexOf(a.charAt(0)) : 0;
    const digitB = b !== null ? digits.indexOf(b.charAt(0)) : digits.length;
    if (digitB - digitA > 1) {
        const midDigit = Math.round(0.5 * (digitA + digitB));
        return digits.charAt(midDigit);
    } else {
        // first digits are consecutive
        if (b && b.length > 1) {
            return b.slice(0, 1);
        } else {
            // `b` is null or has length 1 (a single digit).
            // the first digit of `a` is the previous digit to `b`,
            // or 9 if `b` is null.
            // given, for example, midpoint('49', '5'), return
            // '4' + midpoint('9', null), which will become
            // '4' + '9' + midpoint('', null), which is '495'
            return digits.charAt(digitA) + midpoint(a.slice(1), null, digits);
        }
    }
}

function getIntegerLength(head: string) {
    if (head >= 'a' && head <= 'z') {
        return head.charCodeAt(0) - 'a'.charCodeAt(0) + 2;
    } else if (head >= 'A' && head <= 'Z') {
        return 'Z'.charCodeAt(0) - head.charCodeAt(0) + 2;
    } else {
        throw new Error('Invalid order key head: ' + head);
    }
}

function validateInteger(int: string) {
    if (int.length !== getIntegerLength(int.charAt(0))) {
        throw new Error('invalid integer part of order key: ' + int);
    }
}

// note that this may return null, as there is a largest integer
function incrementInteger(x: string, digits: string) {
    validateInteger(x);
    const [head, ...digs] = x.split('');
    let carry = true;
    for (let i = digs.length - 1; carry && i >= 0; i--) {
        const d = digits.indexOf(digs[i]) + 1;
        if (d === digits.length) {
            digs[i] = '0';
        } else {
            digs[i] = digits.charAt(d);
            carry = false;
        }
    }
    if (carry) {
        if (head === 'Z') {
            return 'a0';
        }
        if (head === 'z') {
            return null;
        }
        const h = String.fromCharCode(head.charCodeAt(0) + 1);
        if (h > 'a') {
            digs.push('0');
        } else {
            digs.pop();
        }
        return h + digs.join('');
    } else {
        return head + digs.join('');
    }
}

// note that this may return null, as there is a smallest integer
function decrementInteger(x: string, digits: string): string | null {
    validateInteger(x);
    const [head, ...digs] = x.split('');
    let borrow = true;
    for (let i = digs.length - 1; borrow && i >= 0; i--) {
        const d = digits.indexOf(digs[i]) - 1;
        if (d === -1) {
            digs[i] = digits.slice(-1);
        } else {
            digs[i] = digits.charAt(d);
            borrow = false;
        }
    }
    if (borrow) {
        if (head === 'a') {
            return 'Z' + digits.slice(-1);
        }
        if (head === 'A') {
            return null;
        }
        const h = String.fromCharCode(head.charCodeAt(0) - 1);
        if (h < 'Z') {
            digs.push(digits.slice(-1));
        } else {
            digs.pop();
        }
        return h + digs.join('');
    } else {
        return head + digs.join('');
    }
}

function getIntegerPart(key: string) {
    const integerPartLength = getIntegerLength(key.charAt(0));
    if (integerPartLength > key.length) {
        throw new Error('invalid order key: ' + key);
    }
    return key.slice(0, integerPartLength);
}

function validateOrderKey(key: string) {
    if (key === SMALLEST_INTEGER) {
        throw new Error('invalid order key: ' + key);
    }
    // getIntegerPart will throw if the first character is bad,
    // or the key is too short.  we'd call it to check these things
    // even if we didn't need the result
    const i = getIntegerPart(key);
    const f = key.slice(i.length);
    if (f.slice(-1) === '0') {
        throw new Error('invalid order key: ' + key);
    }
}

// `a` is an order key or null (START).
// `b` is an order key or null (END).
// `a < b` lexicographically if both are non-null.
// digits is a string such as '0123456789' for base 10.  Digits must be in
// ascending character code order!
export function generateKeyBetween(a: string, b: string, digits: string): string | null {
    if (a !== null) {
        validateOrderKey(a);
    }
    if (b !== null) {
        validateOrderKey(b);
    }
    if (a !== null && b !== null && a >= b) {
        throw new Error(a + ' >= ' + b);
    }
    if (a === null && b === null) {
        return INTEGER_ZERO;
    }
    if (a === null) {
        const ib = getIntegerPart(b);
        const fb = b.slice(ib.length);
        if (ib === SMALLEST_INTEGER) {
            return ib + midpoint('', fb, digits);
        }
        return ib < b ? ib : decrementInteger(ib, digits);
    }
    if (b === null) {
        const ia = getIntegerPart(a);
        const fa = a.slice(ia.length);
        const i = incrementInteger(ia, digits);
        return i === null ? ia + midpoint(fa, null, digits) : i;
    }
    const ia = getIntegerPart(a);
    const fa = a.slice(ia.length);
    const ib = getIntegerPart(b);
    const fb = b.slice(ib.length);
    if (ia === ib) {
        return ia + midpoint(fa, fb, digits);
    }
    const i = incrementInteger(ia, digits);
    return i < b ? i : ia + midpoint(fa, null, digits);
}

// same preconditions as generateKeysBetween.
// n >= 0.
// Returns an array of n distinct keys in sorted order.
// If a and b are both null, returns [a0, a1, ...]
// If one or the other is null, returns consecutive "integer"
// keys.  Otherwise, returns relatively short keys between
// a and b.
export function generateNKeysBetween(a: string, b: string, n: number, digits: string): string[] {
    if (n === 0) {
        return [];
    }
    if (n === 1) {
        return [generateKeyBetween(a, b, digits)];
    }
    if (b === null) {
        let c = generateKeyBetween(a, b, digits);
        const result = [c];
        for (let i = 0; i < n - 1; i++) {
            c = generateKeyBetween(c, b, digits);
            result.push(c);
        }
        return result;
    }
    if (a === null) {
        let c = generateKeyBetween(a, b, digits);
        const result = [c];
        for (let i = 0; i < n - 1; i++) {
            c = generateKeyBetween(a, c, digits);
            result.push(c);
        }
        result.reverse();
        return result;
    }
    const mid = Math.floor(n / 2);
    const c = generateKeyBetween(a, b, digits);
    return [...generateNKeysBetween(a, c, mid, digits), c, ...generateNKeysBetween(c, b, n - mid - 1, digits)];
}
