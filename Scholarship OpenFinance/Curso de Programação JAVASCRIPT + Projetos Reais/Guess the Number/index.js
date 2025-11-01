
let computerNumber
let userNumbers = []
let attempts = 0
let maxguesses = 10

function newGame() {
    window.location.reload()
}


function init() {
   computerNumber = Math.floor(Math.random() * 100 + 1)
   console.log(computerNumber)
}

function compareNumbers() {
   const userNumber = Number(document.getElementById('inputBox').value)
   userNumbers.push(' ' + userNumber)
   document.getElementById('guesses').innerHTML = userNumbers
   attempts++
   document.getElementById('attempts').innerHTML = attempts

    if (userNumber > computerNumber) {
        document.getElementById('textOutput').innerHTML = 'Your number is too high'
        document.getElementById('inputBox').value = ''
    }
    else if (userNumber < computerNumber) {
        document.getElementById('textOutput').innerHTML = 'Your number is too low'
        document.getElementById('inputBox').value = ''
    }
    else {
        document.getElementById('textOutput').innerHTML = 'Congratulations!!!'
        document.getElementById('inputBox').setAttribute('Readonly', 'Readonly')
        return
    }

    if (attempts >= maxguesses) {
        document.getElementById('textOutput').innerHTML = 'You Lose! The computer number was ' + computerNumber
        document.getElementById('inputBox').setAttribute('Readonly', 'Readonly')
    }
}