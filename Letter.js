
var Letter = function (character) {
    this.character = character.toUpperCase();// A string value to store the underlying character for the letter
    this.letterGuessedCorrectly = false;// A boolean value that stores whether that letter has been guessed yet
    this.showCharacter = function () {// A function that returns the underlying character if the letter has been guessed, 
        if (this.letterGuessedCorrectly) {
            console.log(this.character);
        }
        else {
            console.log("*");//or a placeholder (like an underscore) if the letter has not been guessed
        }
    }
}

module.exports = Letter //export Letter constructor