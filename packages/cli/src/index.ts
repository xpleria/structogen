import { Command } from 'commander';
import { GenerateCommand } from "./commands/generate.js";
import { InitCommand } from "./commands/init.js";
import { ValidateCommand } from "./commands/validate.js";

const program = new Command();

program
  .name('structogen')
  .description('Structogen — code generation from schema')
  .version('0.1.0');

new GenerateCommand().register(program);
new InitCommand().register(program);
new ValidateCommand().register(program);

program.parse();