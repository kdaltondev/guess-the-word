const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const guess = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesParagraph = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector("span");
const messages = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";

const placeholders = function(word){
    const placeHoldersArray = [];
    for(let i=1; i<=word.length; i++){
placeHoldersArray.push("●");
    };
    wordInProgress.innerText=`${placeHoldersArray.join('')}`;
return placeHoldersArray;
}

console.log(placeholders(word));

guessButton.addEventListener("click", function(e){
    e.preventDefault();
    const letterGuess = guess.value;
    console.log(letterGuess);
guess.value="";
})