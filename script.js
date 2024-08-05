const phrases = [
    "BACKSITE",
    "BRIMSTONE",
    "ASTRA",
    "YOU ARE TROLLING",
    "DEFUSE",
    "HEAVEN",
    "PEARL",
    "TAP THE BOMB",
    "TIF IS THE ACTUAL GOAT",
    "YORU",
    "HE IS OFF",
    "ONE SHOT",
    "VANDAL",
    "PHANTOM",
    "YOU FUCKING SUCK"
];

let selectedPhrase = phrases[Math.floor(Math.random() * phrases.length)];
let guessedLetters = [];
let mistakes = 0;
const maxMistakes = 6;

const wordContainer = document.getElementById('word-container');
const message = document.getElementById('message');
const hangmanImage = document.getElementById('hangman-image');
const mistakesElement = document.getElementById('mistakes');

function displayWord() {
    wordContainer.innerHTML = selectedPhrase.split('').map(letter => {
        if (letter === ' ') {
            return '&nbsp;';  // Use non-breaking space for displaying spaces
        }
        return guessedLetters.indexOf(letter) >= 0 ? letter : "_";
    }).join(' ');
}

function updateHangmanImage() {
    hangmanImage.src = `val_img.jpeg`; // Assuming you have different images named accordingly
}

function updateMistakes() {
    mistakesElement.innerHTML = `Mistakes: ${mistakes}`;
}

function checkGameStatus() {
    if (mistakes >= maxMistakes) {
        message.innerHTML = `Game Over! The phrase was: ${selectedPhrase}`;
        disableKeyboard();
    } else if (!wordContainer.innerHTML.includes('_')) {
        message.innerHTML = 'You Win!';
        disableKeyboard();
    }
}

function disableKeyboard() {
    document.querySelectorAll('.keyboard button').forEach(button => button.disabled = true);
}

function handleGuess(letter, button) {
    if (guessedLetters.indexOf(letter) === -1) {
        guessedLetters.push(letter);
        if (selectedPhrase.indexOf(letter) === -1) {
            mistakes++;
            updateHangmanImage();
            button.classList.add('disabled');
        } else {
            button.classList.add('correct');
        }
        button.disabled = true;
    }
    displayWord();
    updateMistakes();
    checkGameStatus();
}

function createKeyboard() {
    const keyboard = document.getElementById('keyboard');
    for (let i = 65; i <= 90; i++) {
        const button = document.createElement('button');
        button.innerHTML = String.fromCharCode(i);
        button.addEventListener('click', () => handleGuess(button.innerHTML, button));
        keyboard.appendChild(button);
    }
}

displayWord();
createKeyboard();
updateHangmanImage();
updateMistakes();
