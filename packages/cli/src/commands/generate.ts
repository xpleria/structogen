import { StructogenEngine } from "@xpleria/structogen-core";
import { NodeFileSystem } from "../node-file-system.js";
import { Command } from "commander";

export class GenerateCommand {
  execute(): void {
  const fs = new NodeFileSystem();

  const engine = new StructogenEngine({
    fileSystem: fs,
    baseDir: process.cwd(),
    // other options...
  });
    // TODO: Execute the generate command.
  }

  register(program: Command): void {
    program
      .command('generate')
      .description('Generate code from a schema file')
      .option('-s, --schema <path>', 'path to schema file')
      .option('-o, --output <dir>', 'output directory')
      .option('-l, --lang <languages...>', 'target languages')
      .action((options) => {
        console.log('generate command called with options:', options);
      });
  }
}
