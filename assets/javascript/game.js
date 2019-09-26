/* HW3 Word Guess Game - Name of Fruit Guessing Game */

/* set up the fruit array */
var fruit = ["apple", "apricot", "banana", "blackberry", "blueberry",
    "coconut", "cherry", "clementine", "dragonfruit", "durian", "elderberry",
    "fig", "gooseberry", "grape", "grapefruit", "huckleberry", "jackfruit", "jujube",
    "kiwifruit", "lemon", "lime", "lychee", "mango", "melon", "cantaloupe", "honeydew",
    "watermelon", "nectarine", "orange", "passionfruit", "peach", "pear", "plum", "prune",
    "pineapple", "pomegranate", "raspberry", "strawberry", "tangerine"];

/* initial set up vaiables, arrays and counters */
var count = 0;
var wins = 0;
var correct = false;
var guessRemaining = 30;
var decidedFruit = "";
var underlineArray = [];
var keyPressed = "";
var compare = [];
var outArray = [];
var guess = [];
var guessOut = [];
var attempt = 0;
var duplicate = false;

/* Function for Computer decides name of fruit */
function decideFruit() {
    decidedFruit = fruit[Math.floor(Math.random() * 39)];
    var x = decidedFruit;

    /* store decided word into comparing array */
    var y = x;
    compare = [];
    for (var i = 0; i < y.length; i++) {
        compare[i] = y.charAt(i);
        outArray[i] = "*";
    }
}

/* Function for Current word - display initial underlines */
function currentWordUnderlines() {
    for (var j = 0; j < decidedFruit.length; j++) {
        underlineArray[j] = "_";
    }
    document.getElementById("currentWordID").innerHTML = underlineArray.join(" ");
}

function initialize() {
    correct = false;
    guessRemaining = 30;
    decidedFruit = "";
    underlineArray = [];
    keyPressed = "";
    compare = [];
    outArray = [];
    guess = [];
    guessOut = [];
    attempt = 0;
    decideFruit();
    currentWordUnderlines();
    guessUpdate();
    document.getElementById("winsID").innerHTML = wins;
    document.getElementById("guessRemainingID").innerHTML = guessRemaining;
    document.getElementById("result0").innerHTML = "";
    document.getElementById("result1").innerHTML = "";
}

/* initial display of counters before the game starts */
document.getElementById("winsID").innerHTML = wins;
document.getElementById("guessRemainingID").innerHTML = guessRemaining;
document.getElementById("result1").innerHTML = "Start the game with your first guessing letter.";

/* Function for checking user-decided letters and computer-decided letters */
function check() {
    for (var k = 0; k < compare.length; k++) {
        if (keyPressed === compare[k]) {
            if (outArray[k] === "*" || outArray[k] === "_")
                outArray[k] = keyPressed;
        }
        else {
            if (outArray[k] === "*" || outArray[k] === "_")
                outArray[k] = "_";
        }
    }
    document.getElementById("currentWordID").innerHTML = outArray.join(" ");
}

/* Function for Updating Letters Already Guessed */
function guessUpdate() {
    duplicate = false;
    guess[attempt] = keyPressed;
    for (var l = 0; l < guess.length; l++) {
        if (attempt !== l) {
            if (guessOut[l] === keyPressed)
                duplicate = true;
        }
    }
    if (duplicate === false) {
        guessOut[attempt++] = keyPressed;
    }
    var tempUpper = guessOut.join(" ");
    document.getElementById("letterGuessedID").innerHTML = tempUpper.toUpperCase();
}

/* Game starts here with keyboard press */
document.onkeypress = function (event) {
    document.getElementById("result0").innerHTML = "";
    document.getElementById("result1").innerHTML = "";

    if (count === 0) {
        initialize();
    }
    count++;

    keyPressed = event.key.toLowerCase();
    guessUpdate();
    check();
    if (duplicate === false) {
        document.getElementById("guessRemainingID").innerHTML = --guessRemaining;
    }
    if (outArray.toString() === compare.toString()) {
        document.getElementById("winsID").innerHTML = ++wins;
        var tempOut = decidedFruit;
        initialize();
        document.getElementById("result0").innerHTML = "Congratulations, your answer " + tempOut + " was Correct !!";
        document.getElementById("result1").innerHTML = "Restart the game with your first guessing letter.";
    }

    if (guessRemaining === 0) {
        document.getElementById("guessRemainingID").innerHTML = 0;
        document.getElementById("result0").innerHTML = "SORRY, YOU LOST !! The Answer was " + decidedFruit + ".";
        document.getElementById("result1").innerHTML = "Press Any Key to Restart";
        guessOut = [];
    }
    if (guessRemaining === -1) {
        initialize();
    }
}
