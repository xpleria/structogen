import { Command } from 'commander';

export class ValidateCommand {
  register(program: Command): void {
    program
      .command('validate')
      .description('Validate a schema file')
      .argument('<schema>', 'path to schema file to validate')
      .action((schema) => {
        console.log('validate command called with schema:', schema);
      });
  }
}