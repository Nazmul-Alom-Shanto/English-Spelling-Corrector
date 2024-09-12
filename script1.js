let wordCollection1 = [];
const wordCollection2 = [];
let currentWordIndex = 0;

// Fetch the words from the .txt file
fetch('words.txt')
    .then(response => response.text())
    .then(text => {
        // Split the text file content by line into the word collection
        wordCollection1 = text.split('\n').map(word => word.trim()); // Remove spaces and empty lines
        nextWord(); // Load the first word after fetching
    });

// Function to read word aloud using Web Speech API
function readWordAloud() {
    const word = wordCollection1[currentWordIndex];
    const speech = new SpeechSynthesisUtterance(word);
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);
}

// Function to submit word and check spelling
function submitWord() {
    const userInput = document.getElementById('userInput').value.toLowerCase();
    const word = wordCollection1[currentWordIndex];

    const popupMessage = document.getElementById('popupMessage');
    if (userInput === word) {
        popupMessage.innerText = "Correct! Do you want to move this word to the second collection?";
        popupMessage.classList.add('correct-popup');
        if (confirm("Move this word to collection 2?")) {
            moveToCollection2();
        }
    } else {
        popupMessage.innerText = "Incorrect! The correct spelling is " + word;
        popupMessage.classList.remove('correct-popup');
    }
    popupMessage.style.display = "block";
}

// Move word to second collection
function moveToCollection2() {
    const word = wordCollection1.splice(currentWordIndex, 1)[0]; // Remove from collection 1
    wordCollection2.push(word); // Add to collection 2
    alert("Word moved to collection 2!");
    nextWord(); // Move to next word
}

// Function to load the next word
function nextWord() {
    if (wordCollection1.length > 0) {
        currentWordIndex = Math.floor(Math.random() * wordCollection1.length);
        document.getElementById('userInput').value = "";
        document.getElementById('popupMessage').style.display = "none";
    } else {
        alert("All words are moved to collection 2!");
    }
}

// Event listeners
document.getElementById('playSound').addEventListener('click', readWordAloud);
document.getElementById('submitBtn').addEventListener('click', submitWord);
