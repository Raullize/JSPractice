function verifyPalindrome(string) {
    if (typeof string !== 'string') {
        return "Invalid value detected";
    }

    string = string.toLowerCase().replace(/\s/g, '');
    let reversed = '';
    
    for (let i = string.length - 1; i >= 0; i--) {
        reversed += string[i];
    }
    
    return string === reversed;
}

console.log(verifyPalindrome("arara"));
console.log(verifyPalindrome("A base do teto desaba"));
console.log(verifyPalindrome("xpto"));
console.log(verifyPalindrome(123));
