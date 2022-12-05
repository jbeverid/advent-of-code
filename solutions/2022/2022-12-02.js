import chalk from 'chalk';
import fs from "fs";
import path from "path";

let yourScore = 0;
const input = fs.readFileSync(path.resolve('./inputs/2022/2022-12-02.txt'), 'utf-8');
const winBonusPoints = 6;
const gameRounds = input.split(/\r\n/).filter(x => x !== undefined && x !== '');
// Part 1
gameRounds.forEach(x => {
  const gameKey = x.split(/\s+/);
  yourScore += calcRoundScore(translateToPredefinedMove(gameKey[0]), translateToPredefinedMove(gameKey[1]));
});
console.log(chalk.black.bgGreen('Part 1:') + ` ${yourScore} points!`);

// Part 2
yourScore = 0;
gameRounds.forEach(x => {
  const gameKey = x.split(/\s+/);
  yourScore += calcRoundScore(translateToPredefinedMove(gameKey[0]), translateReactiveMove(translateToPredefinedMove(gameKey[0]), gameKey[1]));
});
console.log(chalk.black.bgGreen('Part 2:') + ` ${yourScore} points!`);

function translateToPredefinedMove(key) {
  switch (key.toUpperCase()) {
    case 'A':
    case 'X':
      return 'rock';
    case 'B':
    case 'Y':
      return 'paper';
    case 'C':
    case 'Z':
      return 'scissors';
  }
}

function translateReactiveMove(opponentMove, key) {
  switch (key.toUpperCase()) {
      // Lose
    case 'X':
      if (opponentMove === 'rock') { return 'scissors'; }
      else if (opponentMove === 'paper') { return 'rock'; }
      return 'paper';
      // Tie
    case 'Y':
      if (opponentMove === 'rock') { return 'rock'; }
      else if (opponentMove === 'paper') { return 'paper'; }
      return 'scissors';
      // Win
    case 'Z':
      if (opponentMove === 'rock') { return 'paper'; }
      else if (opponentMove === 'paper') { return 'scissors'; }
      return 'rock';
  }
}

function calcRoundScore(a, b) {
  if (a === 'rock') {
    switch (b) {
      case 'rock':
        return 1 + (winBonusPoints/2);
      case 'paper':
        return 2 + winBonusPoints;
      case 'scissors':
        return 3;
    }
  }
  else if (a === 'paper') {
    switch (b) {
      case 'rock':
        return 1;
      case 'paper':
        return 2 + (winBonusPoints/2);
      case 'scissors':
        return 3 + winBonusPoints;
    }
  }
  else if (a === 'scissors') {
    switch (b) {
      case 'rock':
        return 1 + winBonusPoints;
      case 'paper':
        return 2;
      case 'scissors':
        return 3 + (winBonusPoints/2);
    }
  }
}
