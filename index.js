#!/usr/bin/env node
import * as path from 'path';
import chalk from 'chalk';
import Yargs from 'yargs';
import { AocDaySolutions } from './day-map.js';

const argv = Yargs(process.argv.slice(2))
  .usage('Usage: $0 [options]')
  .showHelpOnFail(true)
  .option('day', {
    alias: 'd',
    type: 'number',
    description:
      'The day of the month for the advent of code solution you want to run.  For example, --day 17 would be for December 17th.',
    demand: 'true',
  })
  .help('h')
  .alias('h', 'help').argv;

if (
  argv.day >= 1 &&
  argv.day <= 25 &&
  AocDaySolutions.get2022FileMap().has(argv.day)
) {
  const solutionFile = AocDaySolutions.get2022FileMap().get(argv.day);
  import('file://' + solutionFile)
    .then((x) => {})
    .catch((error) => {
      console.error(
        chalk.white.bgRed(' ERROR: ') +
          chalk.red(` An error occurred running ${solutionFile}.`)
      );
      console.error(chalk.red(error));
    });
} else {
  console.error(
    chalk.red('Invalid day specified.  Valid AoC days are: 1 - 25.')
  );
}
