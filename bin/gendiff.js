#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import genDiff from '../src/index.js';

const program = new Command();
program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1>')
  .arguments('<filepath2>')
  .action((filepath1, filepath2) => {
    const options = program.opts();
    const diff = genDiff(filepath1, filepath2, options.format);
    console.log(diff);
  });
program.parse();
