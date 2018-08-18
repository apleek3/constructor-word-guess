# constructor-word-guess
A Word Guess command-line game using constructor functions.

## Synopsis
This is a Hangman style game created to utilize JavaScript Constructors, Node.js, and node package manager libraries (most notably Inquirer) to provide an interactive and fun cmd line experience. 

### Code Example

```
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

```
### Motivation
UC Davis Coding Bootcamp Optional Homework practice! Great project. 

### Installation
Install package.json before running
-- $ npm i

### npm Reference
https://github.com/SBoudrias/Inquirer.js/

### Tests
-- node index
Fill in the prompts to test and play as many times as you like; after you clone the repo and install the package.json

### Copyright
Ref. UC Davis Coding Bootcamp

### Acknowledgements
Thanks to UC Davis Coding Bootcamp for a great project. 
