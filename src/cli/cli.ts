import { Command } from 'commander';

const program = new Command();

program
  .name('my-tool')
  .description('A tool with CLI and GUI')
  .version('1.0.0');

program
  .command('run')
  .description('Run the tool')
  .action(() => {
    console.log('Running the tool...');
  });

program.parse(process.argv);