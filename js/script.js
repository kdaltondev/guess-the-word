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
let remainingGuesses = 8;


let placeholders = function (word) {
    const wordUpper = word.toUpperCase();
    const placeHoldersArray=[];
  for (let i = 1; i <= word.length; i++) {
    placeHoldersArray.push("●");
  }
  wordInProgress.innerText = `${placeHoldersArray.join("")}`;
  return placeHoldersArray;
};

console.log(placeholders(word));
const currentWord = placeholders(word);
console.log(currentWord);

guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  const letterGuess = guess.value;
  console.log(letterGuess);
  guess.value = "";
  messages.innerText = "";
  const playerInputCheck = playerInput(letterGuess);
  console.log(playerInputCheck);
});

const playerInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input === "") {
    console.log("Please enter a single letter");
    guess.value = "";
    return;
  } else if (input.length > 1) {
    console.log("Please enter a single letter not multiple letters");
    guess.value = "";
    return;
  } else if (!input.match(acceptedLetter)) {
    console.log("Please enter a letter - not a number or a symbol");
    guess.value = "";
    return;
  } else if (input != undefined) {
    makeGuess(input);

    return input;
  } else {
    console.log("Something went wrong");
  }
};

const makeGuess = function (letter) {
  letter = letter.toUpperCase();
  if (guessedLettersArray.includes(letter)) {
    console.log("You already guessed that letter");
    return;
  } else {
    guessedLettersArray.push(letter);
    wordUpper = word.toUpperCase();
    console.log(wordUpper.includes(letter));
    if (wordUpper.includes(letter) == true) {
      console.log("The word contains this letter");
    } else {
      console.log("The word is amazing.");
      guessesRemaining();
    }
  }
  showGuessedLetters(guessedLettersArray);
  console.log(guessedLettersArray);
};

const showGuessedLetters = function (guessedLettersArray) {
  guessedLetters.innerHTML = "";
  for (let i = 1; i <= guessedLettersArray.length; i++) {
    const li = document.createElement("li");
    li.innerText = `${guessedLettersArray[i - 1]}`;
    console.log(li.innerText);
    guessedLetters.append(li);
  }
  updateWordInProgress(guessedLettersArray);
  return;
};

const updateWordInProgress = function (guessedLettersArray) {
 const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  let gamePlaceholders = placeholders(word);
  console.log(gamePlaceholders);
  for (let i = 0; i < guessedLettersArray.length; i++) {
    console.log(guessedLettersArray[i]);
    

    //this only finds the first index not subsequent indices need to check multiple times

    while (wordArray.includes(guessedLettersArray[i])) {
      const letterNumber = wordArray.indexOf(guessedLettersArray[i]);
      gamePlaceholders[letterNumber] = guessedLettersArray[i];
      console.log(gamePlaceholders);
      wordInProgress.innerText = `${gamePlaceholders.join("")}`;
     wordArray[letterNumber] = "●";
    }
    let currentGuessedWord = gamePlaceholders.join("");
    //console.log(`This is the current guessed word ${currentGuessedWord}`);
    if (currentGuessedWord === wordUpper) {
      console.log("You win");
      messages.classList.add("win");
      messages.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
      guess.disabled = true;
    }
  }
};

const guessesRemaining = function () {
  remainingGuesses -= 1;
  remainingGuessesParagraph.innerText = `You have ${remainingGuesses} guesses remaining`;
  if (remainingGuesses < 1) {
    guess.disabled = true;
    console.log(`You have no remaining guesses`);
  } else {
    console.log(`You have ${remainingGuesses} guesses remaining`);
  }
};


