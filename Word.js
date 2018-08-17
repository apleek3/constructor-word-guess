var Letter = require("./Letter");

var Word = function (myWord) { // Word.js: Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. That means the constructor should define:
    this.myWord = myWord;
    this.letters = [];
    this.underscores = [];
    this.splitWord = function () { // An array of new Letter objects representing the letters of the underlying word
        this.letters = this.myWord.split("");
        numberUnderscoresNeeded = this.letters.length;
        for (var i=0; i <numberUnderscoresNeeded; i++) {
            this.underscores.push("_ ");
        }
        console.log(this.underscores.join(" "));
        //console.log(this);

    }

    this.generateLetters = function() {
		for (i=0; i < this.letters.length; i++){
			this.letters[i] = new Letter (this.letters[i]);
			//this.letters[i].letterGuessedCorrectly = true;
			//This line of code shows the super array of letter objects for debugging purposes.
			//console.log(this.letters[i]);
			this.letters[i].showCharacter();
		}
    // this.generateLetters = function () {
    //     for (i = 0; i < this.letters.length; i++) {
    //         if (letterGuessedCorrectly = false) {
    //             this.letters[i] = "_";
    //             console.log(this.letters[i]);
    //             console.log(this);
    //         } else if (letterGuessedCorrectly = true) {
    //             this.letters[i] = new Letter(this.letters[i]);
    //             this.letters[i].showCharacter();// A function that returns a string representing the word. This should call the function on each letter object (the first function defined in Letter.js) that displays the character or an underscore and concatenate those together.
    //             //console.log(this.letters.join(" "));
    //             //console.log(this);
    //         }

    //     }
    }
}

// console.log("word test"); //confirmation of module.exports
module.exports = Word;