/* 
  ?
  This program generates a random number between 0 and 100.
  The random number is used as the target number for the user to guess.

*/

// Create a `readline` interface for reading input from the user.
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  // Returns a promise that resolves with the user's input.
  return new Promise((resolve, reject) => {
    rl.question(questionText, (input) => {
  // error handling if the user typed a string or just a non number    
      if(isNaN(input)){
         console.log(`Please enter a whole number and the game restarts as a penalty.`);

         begin();
        }else{
          resolve(input)
        }
    })
  })
}
// Start the guessing game.
begin();

//!module.exports = begin;

async function begin (){
    // Generate a random number between 0 and 100 to start the 
  let min = 0;
  let max = 100;
  let num = Math.floor(Math.random() * (max - min) + min);
    let userGuessNumber = await ask (`\nPlease enter your guess: >> `)
    // Check if the user's guess is correct.
    while (userGuessNumber != num) {
       // If the user's guess is lower than the random number, ask them to guess higher.
        if (userGuessNumber < num){
            userGuessNumber = await ask (`\nPlease guess higher: >> `)
        }
         // If the user's guess is higher than the random number, ask them to guess lower.
        if (userGuessNumber > num){
            userGuessNumber = await ask (`\nPlease guess lower: >> `)
        }
    }
    console.log(`\nPerfect you got it! It was ${userGuessNumber}.`)
    process.exit();
}

/* function begin(){
  // Generate a random number between 0 and 100 to start the 
  let min = 0;
  let max = 100;
  let randomNum = Math.floor(Math.random() * (max - min) + min);
  guessCompNumber(randomNum);
} */