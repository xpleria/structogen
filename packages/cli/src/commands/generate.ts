import { StructogenEngine } from "@xpleria/structogen-core";
import { NodeFileSystem } from "../node-file-system.js";

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
}
