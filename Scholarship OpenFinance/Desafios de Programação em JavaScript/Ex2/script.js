function checkPrimeNumber(number) {
    if (typeof number !== 'number') {
        return "Invalid value detected";
    }

    if (number <= 1) {
        return false;
    }

    for (let i = 2; i <= Math.sqrt(number); i++) {
    // The use of Math.sqrt(number) is an optimization of the application because if a number is not prime, 
    // it will have at least one divisor within this range, allowing for a more efficient verification.
        if (number % i === 0) {
            return false;
        }
    }
    return true;
}

console.log(checkPrimeNumber(7)); 
console.log(checkPrimeNumber(10)); 
console.log(checkPrimeNumber("xpto")); 
