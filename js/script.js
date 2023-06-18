const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const guess = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesParagraph = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector("span");
const messages = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
let word = "magnolia";
let guessedLettersArray = [];
let remainingGuesses = 8;

/*This gets a list of random words and then chooses one for the game*/
const getWord = async function () {
  const resp = await fetch(
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
  );
  const data = await resp.text();
  /*console.log(data);*/
  const randomWordArray = data.split("\n");
  /*console.log(randomWordArray);*/
  const randomNumber = Math.floor(Math.random() * randomWordArray.length);
  const randomWord = randomWordArray[randomNumber];
  word = randomWord.trim();
  /*console.log(randomWord);*/
  const currentWord = placeholders(randomWord);
};
getWord();

/*Creates the placeholder array for the word that displays on the screen*/
let placeholders = function (word) {
  const wordUpper = word.toUpperCase();
  const placeHoldersArray = [];
  for (let i = 1; i <= word.length; i++) {
    placeHoldersArray.push("●");
  }
  wordInProgress.innerText = `${placeHoldersArray.join("")}`;
  return placeHoldersArray;
};

/*Event Listener to check for guess*/
guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  const letterGuess = guess.value;
  guess.value = "";
  messages.innerText = "";
  const playerInputCheck = playerInput(letterGuess);
});

/*Checks to make sure the input is valid*/
const playerInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input === "") {
    messages.innerText = `Please enter a single letter`;
    guess.value = "";
    return;
  } else if (input.length > 1) {
    messages.innerText = `Please enter a single letter not multiple letters`;
    guess.value = "";
    return;
  } else if (!input.match(acceptedLetter)) {
    messages.innerText = `Please enter a letter - not a number or a symbol`;
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
    messages.innerText=`You already guessed that letter`;
    return;
  } else {
    guessedLettersArray.push(letter);
    wordUpper = word.toUpperCase();
   /* console.log(wordUpper.includes(letter));*/
    if (wordUpper.includes(letter) == true) {
      messages.innerText = `The word contains ${letter}`;
    } else {
      messages.innerText = `The word does not contain ${letter}`;
      guessesRemaining();
    }
  }
  showGuessedLetters(guessedLettersArray);
};

const showGuessedLetters = function (guessedLettersArray) {
  guessedLetters.innerHTML = "";
  for (let i = 1; i <= guessedLettersArray.length; i++) {
    const li = document.createElement("li");
    li.innerText = `${guessedLettersArray[i - 1]}`;
    guessedLetters.append(li);
  }
  updateWordInProgress(guessedLettersArray);
  return;
};

const updateWordInProgress = function (guessedLettersArray) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  let gamePlaceholders = placeholders(word);
 
  for (let i = 0; i < guessedLettersArray.length; i++) {
   

    //this only finds the first index not subsequent indices need to check multiple times

    while (wordArray.includes(guessedLettersArray[i])) {
      const letterNumber = wordArray.indexOf(guessedLettersArray[i]);
      gamePlaceholders[letterNumber] = guessedLettersArray[i];
    
      wordInProgress.innerText = `${gamePlaceholders.join("")}`;
      wordArray[letterNumber] = "●";
    }
    let currentGuessedWord = gamePlaceholders.join("");
    //console.log(`This is the current guessed word ${currentGuessedWord}`);
    if (currentGuessedWord === wordUpper) {
     
      messages.classList.add("win");
      messages.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
      guess.disabled = true;
      startOver();
    }
  }
};

const guessesRemaining = function () {
  remainingGuesses -= 1;
  remainingGuessesParagraph.innerText = `You have ${remainingGuesses} guesses remaining`;
  if (remainingGuesses < 1) {
    guess.disabled = true;
    messages.innerText = `You ran out of guesses!`;
    startOver();
  } 
};

const startOver = function(){
  guessButton.classList.add("hide");
  remainingGuessesParagraph.classList.add("hide");
  guessedLetters.classList.add("hide");
  playAgainButton.classList.remove("hide");

}

playAgainButton.addEventListener("click", function(){
  messages.classList.remove("win");
  guessedLettersArray=[];
  guessedLetters.innerText="";
  messages.innerText="";
  remainingGuesses=8;
  remainingGuessesParagraph.innerText = `You have ${remainingGuesses} guesses remaining`;
  playAgainButton.classList.add("hide");
  guessButton.classList.remove("hide");
  remainingGuessesParagraph.classList.remove("hide");
  guessedLetters.classList.remove("hide");
  guess.disabled=false;
  getWord();
})