function sumElements(array) {
    let sum = 0;

    for (let i = 0; i < array.length; i++) {
        if (typeof array[i] !== 'number') {
            return "Invalid value detected";
        }
        sum += array[i];
    }
    return sum;
}

console.log(sumElements([1, 2, 3, 4, 5]));
console.log(sumElements([-1, 10, 20]));
console.log(sumElements([45, 5, "xpto"])); 