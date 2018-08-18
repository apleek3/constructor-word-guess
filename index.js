var Word = require("./Word.js");
var inquirer = require("inquirer");
var isLetter = require('is-letter');
var userGuessedCorrectly = false;//Sets default value for guesses
var wordList = ["apple", "orange", "banana", "watermelon", "mango", "kiwi", "grapefruit", "pomegranate", "durian", "dragonfruit", "lemon", "lime"];//Our word bank - predefined list of words to choose from.

//Choose random word from wordList.
var randomFruit;
var someFruit;

//Counters for wins, losses, and guesses remaining.
var wins = 0;
var losses = 0;
var guessesRemaining = 10;


//Sets the maxListener so that an error isn't returned for hitting the default of 10
require('events').EventEmitter.prototype._maxListeners = 100;


//Variables to hold the letter that the user enters at the inquirer prompt
var userGuess = "";

//Variables to hold letters that user already guessed
var lettersAlreadyGuessedList = "";
var lettersAlreadyGuessedListArray = [];

//Number of underscores/slots that have been filled in with a letter
//When game starts or is reset, this value should be 0
var slotsFilledIn = 0;


//Ask the user if they are ready to play
confirmStart();


//Use Inquirer to prompt the user
function confirmStart() {
  var readyToStartGame = [
    {
      type: 'text',
      name: 'playerName',
      message: 'What is your name?'
    },
    {
      type: 'confirm',
      name: 'readyToPlay',
      message: "Do you wanna play a game? I'm thinking of a fruit; guess its letters. 10 mistakes maximum. Ready?",
      default: true
    }
  ];

  inquirer.prompt(readyToStartGame).then(answers => {
    //Starts the game
    if (answers.readyToPlay) {
      console.log(("Great! Welcome, " + answers.playerName + ". Let's do dis..."));
      startGame();
    }

    else {
      //If user wants to exit game
      console.log(("Good bye, " + answers.playerName + "!"));
      return;
    }
  });
}

//Starts game
function startGame() {
  //Resets number of guesses 
  guessesRemaining = 10;
  //Picks random word from word list
  chooseRandomWord();
  //When game is reset, empties out list of already guessed letters
  lettersAlreadyGuessedList = "";
  lettersAlreadyGuessedListArray = [];
}

//Function to choose a random word from the list of fruits in the word bank
function chooseRandomWord() {
  //Randomly generates fruit from wordList array
  randomFruit = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
  //Sets the random fruit chosen from the word list to someFruit
  someFruit = new Word(randomFruit);
  //Tell the user how many letters are in the fruit
  console.log(("Your 'fruit' contains " + randomFruit.length + " letters."));
  console.log(("'FRUIT' TO GUESS:"));
  //Use the Word constructor in Word.js to split the fruit and make letters
  someFruit.splitWord();
  someFruit.generateLetters();
  guessLetter();
}

//Prompts the user to enter a letter and stores it as their guess
function guessLetter() {
  //Prompts user to enter a letter if there are slots/underscores that still need to be filled in
  if (slotsFilledIn < someFruit.letters.length || guessesRemaining > 0) {
    inquirer.prompt([
      {
        name: "letter",
        message: "Guess a letter:",
        //Check if value is a letter using the 'is-letter'
        validate: function (value) {
          if (isLetter(value)) {
            return true;
          }
          else {
            return false;
          }
        }
      }
    ]).then(function (guess) {
      //Converts all letters guessed to upper case
      guess.letter.toUpperCase();
      console.log(("You guessed: " + guess.letter.toUpperCase()));
      //Assumes  guess to be false initially
      userGuessedCorrectly = false;
      //Finds out if letter was already guessed. If already guessed, notify the user
      if (lettersAlreadyGuessedListArray.indexOf(guess.letter.toUpperCase()) > -1) {
        //If user already guessed a letter runs inquirer again
        console.log(("You already guessed that letter. Enter another one."));
        console.log(("*****************************************************************************"));
        guessLetter();
      }

      //If user enters a letter that was not already guessed
      else if (lettersAlreadyGuessedListArray.indexOf(guess.letter.toUpperCase()) === -1) {
        //Adds letter to list of already guessed letters
        lettersAlreadyGuessedList = lettersAlreadyGuessedList.concat(" " + guess.letter.toUpperCase());
        lettersAlreadyGuessedListArray.push(guess.letter.toUpperCase());
        //Shows letters already guessed to user
        console.log((('Letters guessed so far: ') + lettersAlreadyGuessedList));

        // Determines if the letter that the user guessed matches one of the letters in the word.
        for (i = 0; i < someFruit.letters.length; i++) {
          //If the user's guess equals one of the letters/characters in the word and letterGuessedCorrectly is equal to false 
          if (guess.letter.toUpperCase() === someFruit.letters[i].character && someFruit.letters[i].letterGuessedCorrectly === false) {
            //Sets letterGuessedCorrectly property for that letter equal to true
            someFruit.letters[i].letterGuessedCorrectly === true;
            //Sets userGuessedCorrectly to true
            userGuessedCorrectly = true;
            someFruit.underscores[i] = guess.letter.toUpperCase();
            //Increase the number of slots/underscores filled in with letters by 1
            slotsFilledIn++
          }
        }
        //Show off progress so far with hint
        console.log(("WORD TO GUESS:"));
        someFruit.splitWord();
        someFruit.generateLetters();

        //User guesses correctly
        if (userGuessedCorrectly) {
          console.log(('CORRECT!'));
          console.log(("*****************************************************************************"));
          //Function to see if user won yet
          checkIfUserWon();
        }

        //User guesses incorrectly
        else {
          console.log(('INCORRECT!'));
          //'Lives' -1
          guessesRemaining--;
          console.log(("You have " + guessesRemaining + " guesses left."));
          console.log(("*****************************************************************************"));
          //Function to see if user won yet
          checkIfUserWon();
        }
      }
    });
  }
}

//function to see if the user won or lost 
function checkIfUserWon() {
  //If Lives/guess = 0, Game Over
  if (guessesRemaining === 0) {
    console.log(("*****************************************************************************"));
    console.log(('YOU LOST. BETTER LUCK NEXT TIME.'));
    console.log(("The 'fruit' was: " + randomFruit));
    //Increase loss counter by 1
    losses++;
    //Displays totals
    console.log(("Wins: " + wins));
    console.log(("Losses: " + losses));
    console.log(("*****************************************************************************"));
    //Asks user if they want to play again
    playAgain();
  }

  //If the number of slots/underscores that are filled in with a letter equals the number of letters in the word, then the user won
  else if (slotsFilledIn === someFruit.letters.length) {
    console.log(("*****************************************************************************"));
    console.log(("YOU WON!"));
    //Increases win counter by 1
    wins++;
    //Show total wins and losses
    console.log(("Wins: " + wins));
    console.log(("Losses: " + losses));
    console.log(("*****************************************************************************"));
    //Asks user if they want to play again
    playAgain();
  }

  else {
    //If user did not win or lose keeps on playing
    guessLetter("");
  }

}

//Function that asks the user if they want to play again
function playAgain() {
  var playGameAgain = [
    {
      type: 'confirm',
      name: 'playAgain',
      message: 'Do you want to play again?',
      default: true
    }
  ];

  inquirer.prompt(playGameAgain).then(userWantsTo => {
    if (userWantsTo.playAgain) {
      //Empties out the array that contains the letters
      lettersAlreadyGuessedList = "";
      lettersAlreadyGuessedListArray = [];
      //Resets the number of slots filled in
      slotsFilledIn = 0;
      console.log(("Great! Welcome back. Let's begin..."));
      //start a new game.
      startGame();
    }

    else {
      //Ends game if user doesn't want to play again. Whatever.
      console.log(("Good bye!"));
      return;
    }
  });
}

