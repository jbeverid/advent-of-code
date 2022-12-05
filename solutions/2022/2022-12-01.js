import chalk from 'chalk';
import * as path from 'path';
import * as fs from 'fs';

const input = fs.readFileSync(path.resolve('./inputs/2022/2022-12-01.txt'), 'utf-8');
// Read File Into Array
const groupedByElf = input.split(/\n\s*\n/);
const calArrayGroupedByElf = groupedByElf.map(x =>
    x.split('\n')
        .map(y => Number.parseInt(y, 10))
);
const totalCalories = calArrayGroupedByElf
    .map(x => {
      return x.reduce((totalCalories, foodItemCal) => totalCalories + foodItemCal, 0)
    })
    .filter(x => !Number.isNaN(x));

// Calculate
const maxCalories = Math.max(...totalCalories);
const topElvesTotal = totalCalories
    .sort((a, b) => (a - b) > 0 ? -1 : 1)
    .slice(0, 3)
    .reduce((totalCalories, elfTotal) => totalCalories + elfTotal, 0);
console.log(chalk.black.bgGreen('Part 1 - Total Calories:') + ' ' + maxCalories);
console.log(chalk.black.bgGreen('Part 2 - Total Calories:') + ' ' + topElvesTotal);
