function checkPrimeNumber(number) {
    if (typeof number !== 'number') {
        return "Invalid value detected";
    }

    if (number <= 1) {
        return false;
    }

    for (let i = 2; i <= Math.sqrt(number); i++) {
    // O uso de Math.sqrt(number) é uma otimização da aplicação, pois se um número não é primo, ele terá
    // pelo menos um divisor neste intervalo, permitindo uma verificação mais eficiente
        if (number % i === 0) {
            return false;
        }
    }
    return true;
}

console.log(checkPrimeNumber(7)); 
console.log(checkPrimeNumber(10)); 
console.log(checkPrimeNumber("xpto")); 