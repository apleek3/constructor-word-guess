var Letter = function (character) {
    this.character = character.toUpperCase();// A string value to store the underlying character for the letter
    this.letterGuessedCorrectly = false;// A boolean value that stores whether that letter has been guessed yet
    this.showCharacter = function () {// A function that returns the underlying character if the letter has been guessed

        if (character === " ") {
            this.letterGuessedCorrectly = true;

        } else {
            this.letterGuessedCorrectly = false;
        }

        Letter.prototype.showCharacter = function () {
            if (this.letterGuessedCorrectly) {
                return this.value;
            } else {
                return "_";
            }
        };
    }
}   

module.exports = Letter //export Letter 
