import chalk from 'chalk';
import fs from "fs";
import path from "path";

main();
function main() {
  const packetSize = 4;
  const messageSize = 14;
  const data = getFileContents()[0];
  const partOne = tokenizer(data, packetSize);
  const partTwo = tokenizer(data, messageSize);
  console.log(partTwo);
  console.log(chalk.black.bgGreen('Part 1 - Packets:') + ' ' + partOne.charactersProcessed);
  console.log(chalk.black.bgGreen('Part 2 - Messages:') + ' ' + partTwo.charactersProcessed);
}

function tokenizer(data, packetSize) {
  for (let i = 0; i < data.length; i++) {
    const str = data.substr(i, packetSize);
    const potentialStart = getHeaderSet(str);
    if (potentialStart.size === packetSize) {
      return { charactersProcessed: i+packetSize, data: str }
    }
  }
  return undefined;
}

function getHeaderSet(str) {
  const dataSet = new Set();
  for(let i = 0; i < str.length; i++) {
    dataSet.add(str.charAt(i));
  }
  return dataSet;
}

function getFileContents() {
  return fs.readFileSync(path.resolve('./inputs/2022/2022-12-06.txt'), 'utf-8')
    .split(/\r?\n/)
    .filter(line => line !== undefined && line.trim() !== '')
}
