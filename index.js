// Import the `assert` and `path` modules.
const { rejects } = require('assert');
const { resolve } = require('path');
//!!const reverse_game = require('./resource/reverse_game.js');






// Create a `readline` interface for reading input from the user.
const rl = require('readline').createInterface(process.stdin, process.stdout);

// Define a function `ask` that asks the user a question and returns their answer.
function ask(questionText) {
  // Return a promise that resolves with the user's answer.
  return new Promise((resolve, reject) => {
    rl.question(questionText, input => resolve(input.toLowerCase()));
  });
}


let count = 0; // A number variable that checks the guessing attempt it should be 7 or lower

// Call the `start` function to start the game.
/* 
  TODO: WILL NEED TO FIGURE OUT HOW TO USE module.export 
  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
gameSelection();

async function gameSelection (){
  let choice = await ask (`Do you want the computer to guess your number or the reverse?\n [1] for the computer to guess. Press any key for the reverse>> :`)
  if (choice === 1){
    console.log("Let's put this computer to work!")
  }else{
    reverse_game();
  }
}
 */
// Define a function `findNewGuess` that finds a new guess based on the current minimum and maximum values.
function findNewGuess(min, max) {
  count++;
  return Math.floor((min + max) / 2);
}


// Define a function `initiateAnotherGame` that asks the user if they want to play another game and returns their answer.
function initiateAnotherGame(newGameAnswer) {
  return new Promise((resolve, reject) => {
    rl.question(newGameAnswer, input => resolve(input.toLowerCase()));
  });
}

start();
// Define an async function `start` that plays the guessing game.
async function start() {
  let min = 0;
  let max = 100;

  // Get a new guess from the `findNewGuess` function.
  let newGuess = findNewGuess(min, max);

  // Greet the user and explain the game.
  console.log(`\nLet's play a game where you (human) make up a number and I (computer) try to guess it.`);

  let validator = 0 //while loop condition validator if the computer guessed correctly
  let countForCheating = 0; //cheating monitor, it values change from 0 to 1 if a suspected guess is outside of the acceptable limit
  let compGuess = ""; // a string variable that store the user answer if the guess is lower or higher than expected
  
  // Loop while the computer has not guessed the correct number and the user has not cheated.
  while (validator != 1 && countForCheating == 0) {
    compGuess = await ask(
      `\nIs it ... ${newGuess}?\nPlease answer with [N] for no and [Y] for Yes: >> `
    );

    // If the user says yes, the computer has guessed the correct number.
    if (compGuess === "y") {
      console.log(`\nI knew I could do it! ${newGuess} it is!`);
      // Set the `validator` variable to 1, to break out of the loop
      validator = 1;
    } else if (compGuess === "n") {
      // Ask the user if the guess is higher or lower.
      compGuess = await ask("\nIs it higher (H), or lower (L)?: >> ");
      // if the user answers hight and the guess is within the upper limit
      if (compGuess === "h" && !(newGuess >= max)) {
        min = newGuess + 1; //since the guessed number is lower it shouldn't be included
      } else if (compGuess === "l" && !(newGuess <= min)) {
        max = newGuess - 1;
      } else if(compGuess !== "h" && compGuess !== "l"){
        console.log("\n>>>>>>>>>>>>>>>>>>>>Please pay attention to the prompt!")
        continue;
      }else {
        // The user has cheated.
        console.log(`\nPlease don't cheat.....\nAt this stage your number can't be less\nthan ${min} or greater than ${max}\nRe-think of a new number and play again.`);
        // Set the `countForCheating` variable to 1.
        countForCheating = 1;
      }
      // Get a new guess from the `findNewGuess` function.
      newGuess = findNewGuess(min, max);
    }
  }

  // If the user has not cheated, ask them if they want to play another game.
  let playAgain = await initiateAnotherGame(`\nDo you want to play another game?\n[Y] to continue [press any other button to exit]: `);

  // After each Session the user gets the number of attempts the computer needed to get it right
  console.log(`\nThe previous session took ${count} guessing attempts `)
  // If the user wants to play another game, start the game again.
  if (playAgain == "y") {
    start();
  } else {
    // Otherwise, thank the user for playing and exit the game.
    console.log(`\nThank you! See you next time`)
    process.exit();
  }
  
}