var Letter = require("./Letter");

var Word = function (myWord) { // Word.js: Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. That means the constructor should define:
    this.myWord = myWord;
    this.letters = [];
    this.underscores = [];
    this.splitWord = function () { // An array of new Letter objects representing the letters of the underlying word
        this.letters = this.myWord.split("");
        numberUnderscoresNeeded = this.letters.length;
        console.log(this.underscores.join(" "));
    }
    this.generateLetters = function () {
        for (i = 0; i < this.letters.length; i++) {
            this.letters[i] = new Letter(this.letters[i]);
            this.letters[i].showCharacter();// A function that returns a string representing the word. This should call the function on each letter object (the first function defined in Letter.js) that displays the character or an underscore and concatenate those together.
        }
    }
}

module.exports = Word;