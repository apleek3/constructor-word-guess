// index.js: The file containing the logic for the course of the game, which depends on Word.js and:


// Randomly selects a word and uses the Word constructor to store it
// Prompts the user for each guess and keeps track of the user's remaining guesses

var inquirer = require('inquirer');

/**
 * Recursive prompt example
 * Allows user to choose when to exit prompt
 */

'use strict';

var output = [];

var questions = [
  {
    type: 'input',
    name: 'guessWord',
    message: "Guess a letter! : "
  },
  {
    type: 'confirm',
    name: 'askAgain',
    message: 'Want to guess another letter? (just hit enter for YES)?',
    default: true
  }
];

function ask() {
  inquirer.prompt(questions).then(answers => {
    output.push(answers.guessWord);
    if (answers.askAgain) {
      ask();
    } else {
      console.log('Your letters so far are: ', output.join(', '));
    }
  });
}

ask();