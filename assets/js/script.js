// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener('DOMContentLoaded', function(){
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons){
        button.addEventListener('click', function(){
            if (this.getAttribute('data-type') === 'submit'){
                checkAnswer();
            } else {
                let gameType = this.getAttribute('data-type');
                runGame(gameType);
            }
        });
    }

    runGame('addition');
});

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {
    // Creates two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === 'addition') {
        displayAdditionQuestions(num1, num2);
    } else if (gameType === 'subtract') {
        displaySubtractionQuestions(num1, num2);
    } else if (gameType === 'multiply') {
        displayMultiplyQuestions(num1, num2);
    } else if (gameType === 'division') {
        displayDevideQuestions(num1, num2);
    } 
    else {
        alert(`Unknown game type: ${gameType}`);
        throw `unknown game type: ${gameType}. Aborting`;
    }
    
}
/**
 * checks if the answ against the first element in
 * the returned clalculateAnswer array
 */
function checkAnswer() {
    let userAnswer = parseInt(document.getElementById('answer-box').value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];
    
    if (isCorrect) {
        alert('Hey! You got it right! :D');
        incrementScore();
    } else {
        alert(`Awww... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();

    }
    runGame(calculatedAnswer[1]);
}
/**
 * Gets the operands (the numbers) and the operator (plus, minus etc)
 * directly from the dom, and returns the correct answer.
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === '+') {
        return [operand1 + operand2, 'addition'];
        } else if (operator === 'x') {
            return [operand1 * operand2, 'multiply']
        } else if (operator === '-') {
            return [operand1 - operand2, 'subtract']
        } else if (operator === '/') {
            return [operand1 / operand2, 'division']
        } else {
            alert(`unimplemented operator ${operator}`);
            throw `unimplemented operator ${operator}. Aborting!`;
        }

}
function incrementScore() {
    let oldScore = parseInt(document.getElementById('score').innerText);
    document.getElementById('score').innerText = ++oldScore;
}
function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById('incorrect').innerText);
    document.getElementById('incorrect').innerText = ++oldScore;

}
function displayAdditionQuestions(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = '+';

}
function displaySubtractionQuestions(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = '-';
    
}
function displayMultiplyQuestions(operand1, operand2) { 
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = 'x';
    
}
function displayDevideQuestions(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = '/';
    
}