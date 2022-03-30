#!/usr/bin/env node
import gendiff from '../src/index.js'
import { program } from 'commander';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2> [format]')
  .action((filepath1, filepath2, format = 'stylish') => {
    return gendiff(filepath1, filepath2, format).map(key => console.log(key));
  });

program.parse(process.argv);