import chalk from 'chalk';
import * as path from 'path';
import * as fs from 'fs';

let partOneTotal = 0;
let partTwoTotal = 0;
const input = fs.readFileSync(path.resolve('./inputs/2022/2022-12-03.txt'), 'utf-8');
// Read File Into Array
const allRucksacks = input
    .split(/\r?\n/)
    .filter(line => line !== undefined && line.trim() !== '');

allRucksacks.forEach(x => {
  const firstCompartment = x.substring(0, x.length/2);
  const secondCompartment = x.substring(x.length/2);
  const priorityItemsArray = findPriorityItems(firstCompartment, secondCompartment);
  const value = getPriorityValues(priorityItemsArray);
  partOneTotal += value;
});

// Part Two:
const groups = createRucksackGroups(allRucksacks, 3);
groups.forEach(rucksackGroup => {
  const priorityItemsSet = findGroupPriorityItems(rucksackGroup, 3);
  partTwoTotal += getPriorityValues(priorityItemsSet);
});

console.log(chalk.black.bgGreen('Part 1:') + ' ' + partOneTotal);
console.log(chalk.black.bgGreen('Part 2:') + ' ' + partTwoTotal);

function createRucksackGroups(rucksacks, groupSize = 3) {
  const rucksackQueue = [...rucksacks];
  const allGroups = []
  while (rucksackQueue.length > 0) {
    const rucksackGroup = [];
    for (let i = 0; i < groupSize; i++) {
      if (rucksackQueue.length > 0) {
        rucksackGroup.push(rucksackQueue.pop());
      }
    }
    allGroups.push(rucksackGroup);
  }
  return allGroups;
}

function findGroupPriorityItems(rucksackGroup) {
  const itemSet = new Set();
  rucksackGroup.forEach(rucksack => {
    for (let i = 0; i < rucksack.length; i++) {
      const item = rucksack.charAt(i);
      if (assertItemInAllRucksacks(item, rucksackGroup)) {
        itemSet.add(item);
      }
    }
  });
  return itemSet;
}

function assertItemInAllRucksacks(item, rucksackGroup) {
  const rucksackPositions = [];
  rucksackGroup.forEach(x => {
    rucksackPositions.push(x.indexOf(item));
  });
  return !rucksackPositions.includes(-1);
}

function findPriorityItems(a, b) {
  const priorityItems = new Set();
  for (var i = 0; i < a.length; i++) {
    const item = a.charAt(i);
    if (b.includes(item)) {
      priorityItems.add(item);
    }
  }
  return priorityItems;
}

function getPriorityValues(set) {
  let priorityValue = 0;
  set.forEach(x => {
    if (x === x.toUpperCase()) {
      priorityValue += x.charCodeAt(0) - 65 + 27;
    }
    else if (x === x.toLowerCase()) {
      priorityValue += x.charCodeAt(0) - 96;
    }
  });
  return priorityValue;
}
