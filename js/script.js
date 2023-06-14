const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const guess = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesParagraph = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector("span");
const messages = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";
const guessedLettersArray = [];

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
messages.innerText="";
const playerInputCheck = playerInput(letterGuess);
console.log(playerInputCheck);
})

const playerInput = function (input){
    const acceptedLetter = /[a-zA-Z]/;
    if (input===""){
        console.log("Please enter a single letter");
        guess.value="";
        return;
    }else if (input.length>1){
        console.log("Please enter a single letter not multiple letters");
        guess.value=""
        return;
    }else if (!input.match(acceptedLetter)){
        console.log("Please enter a letter - not a number or a symbol");
guess.value=""
        return;
    }else if(input!=undefined){
        makeGuess(input);
        return input;
    }else{
        console.log("Something went wrong");
    }

}

const makeGuess = function(letter){
    letter = letter.toUpperCase();
    if (guessedLettersArray.includes(letter)){
        console.log("You already guessed that letter");
        return;
    }else {
        guessedLettersArray.push(letter);
        console.log(guessedLettersArray);
    }
}

