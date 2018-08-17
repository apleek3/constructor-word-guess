var Letter = require("./Letter");

var Word = function (myWord) { // Word.js: Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. That means the constructor should define:
    this.myWord = myWord;
    this.letters = [];
    this.underscores = [];
    this.splitWord = function () { // An array of new Letter objects representing the letters of the underlying word
        this.letters = this.myWord.split("");
        numberUnderscoresNeeded = this.letters.length;
        for (var i = 0; i < numberUnderscoresNeeded; i++) {
            this.underscores.push("_ ");
            if (this.underscores.length > numberUnderscoresNeeded) {
                this.underscores.pop();
            }
        }
        console.log(this.underscores.join(" "));
    }

    this.generateLetters = function () {
        for (i = 0; i < this.letters.length; i++) {
            this.letters[i] = new Letter(this.letters[i]);
            this.letters[i].showCharacter();
        }
    }
}

module.exports = Word;// console.log("word test"); //confirmation of module.exports