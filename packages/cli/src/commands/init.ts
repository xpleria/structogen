import { Command } from 'commander';

export class InitCommand {
  register(program: Command): void {
    program
      .command('init')
      .description('Initialize a new structogen project')
      .option('-n, --name <name>', 'project name')
      .action((options) => {
        console.log('init command called with options:', options);
      });
  }
}