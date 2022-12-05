import chalk from 'chalk';
import fs from "fs";
import path from "path";

let fullOverlapTotal = 0;
let anyOverlapTotal = 0;
const input = fs.readFileSync(path.resolve('./inputs/2022/2022-12-04.txt'), 'utf-8');
const allPairs = input
    .split(/\r?\n/)
    .filter(line => line !== undefined && line.trim() !== '');

const elfRanges = allPairs
    .map(x => {
      const elfPairs = x.split(',');
      return { a: elfPairs[0], b: elfPairs[1]}
    })
    .map(x => {
      const elfA = x.a.split('-');
      const elfB = x.b.split('-');
      return {
        a: range(Number.parseInt(elfA[0], 10), Number.parseInt(elfA[1], 10)),
        b: range(Number.parseInt(elfB[0], 10), Number.parseInt(elfB[1], 10)),
      }
    });

elfRanges.forEach(elfPair => {
  if (elfPair.a.every(section => elfPair.b.includes(section)) || elfPair.b.every(section => elfPair.a.includes(section))) {
    fullOverlapTotal++;
  }
});

elfRanges.forEach(elfPair => {
  let alreadyCounted = false;
  elfPair.a.forEach(x => {
    if (elfPair.b.includes(x) && !alreadyCounted) {
      anyOverlapTotal++;
      alreadyCounted = true;
    }
  });
});

function range(start, end) {
  var result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}
console.log(chalk.black.bgGreen('Part 1 - Overlap Total:') + ' ' + fullOverlapTotal);
console.log(chalk.black.bgGreen('Part 2 - Any Overlap Total:') + ' ' + anyOverlapTotal);
