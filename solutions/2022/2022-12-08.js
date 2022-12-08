import chalk from 'chalk';
import fs from "fs";
import path from "path";

main();
function main() {
  const treeMap = getFileContents();
  const leftTrees = [];
  const rightTrees = [];
  const mapSet = new Set();
  treeMap.forEach((row, rowIndex) => {
    leftTrees.push(...checkLeft(row, rowIndex));
    rightTrees.push(...checkRight(row, rowIndex));
  });
  console.log('Left', leftTrees);
  console.log('Right', rightTrees);
  console.log('Map', treeMap);
}

function addVisibleTrees(visibleTreeMap, array, direction) {
  array.forEach(data => {
    const key = data.xPos + '-' + data.yPos;
    if (visibleTreeMap.has(key)) {
      const directionArray = visibleTreeMap.get(key).push(direction);
      visibleTreeMap.set(key, directionArray);
    }
    else {
      visibleTreeMap.set(key, [direction]);
    }
  });
}

function checkLeft(array, x) {
  const visibleTreesPos = [];
  array.forEach((height, index, array) => {
    const maxValue = index !== 0 ? Math.max(array.slice(0, index + 1)) : -1;
    if (maxValue < height) {
      visibleTreesPos.push({ xPos: x, yPos: index, value: height });
    }
  });
  return visibleTreesPos;
}

function checkRight(array, x) {
  const visibleTreesPos = [];
  for (let i = array.length - 1; i >= 0; i--) {
    const maxValue = i !== array.length ? Math.max([...array.slice(i, array.length - i * -1)]) : -1;
    console.log(maxValue);
    if (maxValue < array[i]) {
      visibleTreesPos.push({ xPos: x, yPos: i, value: array[i] });
    }
  }
  return visibleTreesPos;
}


function getFileContents() {
  return fs.readFileSync(path.resolve('./inputs/2022/2022-12-08.txt'), 'utf-8')
    .split(/\r?\n/)
    .filter(line => line !== undefined && line.trim() !== '')
    .map(x => {
      const data = [];
      for (let i = 0; i < x.length; i++) {
        data.push(Number.parseInt(x.charAt(i), 10));
      }
      return data;
    });
}
