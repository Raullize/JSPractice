

function outcome() {
	let num1 = parseFloat(document.getElementById('num-one').value);
	let num2 = parseFloat(document.getElementById('num-two').value);
	let operation = document.querySelector('input[name="sign-area"]:checked').value;
	let result;
	
	if (isNaN(num1) || isNaN(num2)) {
		result = "Please enter valid numbers";
	} else {
		switch(operation) {
			case 'add':
				result = num1 + num2;
				break;
			case 'subtract':
				result = num1 - num2;
				break;
			case 'multiply':
				result = num1 * num2;
				break;
			case 'divide':
				result = num2 !== 0 ? num1 / num2 : "Cannot divide by zero";
				break;
		}
	}
	
	const resultArea = document.getElementById('resultArea');
	resultArea.innerHTML = result;
	resultArea.style.display = 'flex';
}