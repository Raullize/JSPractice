function somarElementos(array) {
    let soma = 0;

    for (let i = 0; i < array.length; i++) {
        if (typeof array[i] !== 'number') {
            return "Valor invalido detectado";
        }
        soma += array[i];
    }
    return soma;
}

console.log(somarElementos([1, 2, 3, 4, 5])); 
console.log(somarElementos([-1, 10, 20])); 
console.log(somarElementos([45, 5, "xpto"])); 