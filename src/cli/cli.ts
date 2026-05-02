#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program
  .name('structogen')
  .description('A JSON Schema tool to generate class files')
  .version('0.1.0');

program
  .command('run')
  .description('Run the tool')
  .action(() => {
    console.log('Running the tool...');
  });

program.parse(process.argv);