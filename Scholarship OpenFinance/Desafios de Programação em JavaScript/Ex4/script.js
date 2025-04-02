function playRockPaperScissors(playerChoice) {
    if (typeof playerChoice !== 'string') {
        return "Invalid value detected";
    }
    
    playerChoice = playerChoice.toLowerCase();
    
    if (playerChoice !== 'rock' && playerChoice !== 'paper' && playerChoice !== 'scissors') {
        return "Invalid choice. Use: rock, paper or scissors";
    }

    const choices = ['rock', 'paper', 'scissors'];
    const cpuChoice = choices[Math.floor(Math.random() * 3)];
    console.log(`CPU chose ${cpuChoice}`);

    if (playerChoice === cpuChoice) {
        return "Draw!";
    }

    if (
        (playerChoice === 'rock' && cpuChoice === 'scissors') ||
        (playerChoice === 'paper' && cpuChoice === 'rock') ||
        (playerChoice === 'scissors' && cpuChoice === 'paper')
    ) {
        return "You won!";
    }

    return "You lost!";
}

console.log(playRockPaperScissors("rock"));
console.log(playRockPaperScissors("paper"));
console.log(playRockPaperScissors("scissors"));
console.log(playRockPaperScissors("invalid"));
console.log(playRockPaperScissors(123));
