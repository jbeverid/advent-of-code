import chalk from 'chalk';
import fs from "fs";
import path from "path";

main();
function main() {
  const columnWidth = 3;
  const columnGap = 1;
  const allStacks = parseGrid(columnWidth, columnGap);
  const instructions = parseInstructions();
  const partOneStacks = [...allStacks.map(x => [...x])];
  const partTwoStacks = [...allStacks.map(x => [...x])];
  instructions.forEach((cmd) => {
    executeCommand(cmd, partOneStacks, true);
  });
  instructions.forEach((cmd) => {
    executeCommand(cmd, partTwoStacks, false);
  });
  console.log(chalk.black.bgGreen('Part 1 - Top Blocks:') + ' ' + getTopBlocks(partOneStacks));
  console.log(chalk.black.bgGreen('Part 2 - Top Blocks:') + ' ' + getTopBlocks(partTwoStacks));
}

function getTopBlocks(stacks) {
  return stacks.map(x => x[x.length - 1]).join('');
}

function executeCommand(cmd, stacks, isSingleCrateMove = true) {
  if (isSingleCrateMove) {
    for (let i = 0; i < cmd.blocks; i++) {
      const crate = stacks[cmd.from - 1].pop();
      stacks[cmd.to - 1].push(crate);
    }
  }
  else {
    const crateStack = [];
    for (let i = 0; i < cmd.blocks; i++) {
      const crate = stacks[cmd.from - 1].pop();
      crateStack.push(crate);
    }
    stacks[cmd.to - 1].push(...crateStack.reverse());
  }
}

function initStacks(height) {
  const stacks = [];
  for (let i = 0; i < height; i++) {
    stacks.push([]);
  }
  return stacks;
}

function parseGrid(columnWidth, columnGap) {
  const inputFile = fs.readFileSync(path.resolve('./inputs/2022/2022-12-05.txt'), 'utf-8')
      .split(/\r?\n/);
  const endTableIndex = inputFile.findIndex(x => x.match(/^$/));
  const gridInput = inputFile
      .splice(0, endTableIndex)
      .filter(line => line !== undefined && line.trim() !== '')
      .map((element, index, array) => {
        const longestRow = Math.max(...(array.map(el => el.length)));
        const str = element.length === longestRow ? element : element.padStart(columnGap, ' ').padEnd(longestRow, ' ');
        return str.padStart(longestRow + columnGap);
      });

  const columnCount = gridInput[0].length/(columnWidth+columnGap);
  const rowCount = gridInput.length;
  const legendRow = rowCount - 1;
  const allStacks = initStacks(columnCount);

  for(let rowPos = 0; rowPos < legendRow; rowPos++) {
    const str = gridInput[rowPos];
    for(let colIndex = 0; colIndex < str.length/(columnWidth+columnGap); colIndex++) {
      const startPos = colIndex===0 ? columnGap : colIndex * (columnWidth + columnGap);
      const endPos = colIndex === 0 ? startPos + columnWidth - columnGap - 1 : startPos + columnWidth - columnGap;
      const value = str.substring(startPos, endPos + columnWidth)
          .trim()
          .replace('[', '')
          .replace(']', '');
      if (value && value.length > 0) {
        allStacks[colIndex].push(value);
      }
    }
  }
  allStacks.map(x => x.reverse());
  return allStacks;
}

function parseInstructions() {
  const inputFile = fs.readFileSync(path.resolve('./inputs/2022/2022-12-05.txt'), 'utf-8')
      .split(/\r?\n/);
  const endTableIndex = inputFile.findIndex(x => x.match(/^$/));
  return inputFile.splice(endTableIndex)
      .filter(line => line !== undefined && line.trim() !== '')
      .map(x => {
        const cmdParts = x.split(/\s+/);
        return { command: cmdParts[0], blocks: cmdParts[1], from: cmdParts[3], to: cmdParts[5] };
      });
}
