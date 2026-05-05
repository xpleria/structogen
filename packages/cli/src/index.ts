import { GenerateCommand } from "./commands/generate.js";
import { InitCommand } from "./commands/init.js";
import { ValidateCommand } from "./commands/validate.js";

export { GenerateCommand, InitCommand, ValidateCommand };

const args = process.argv.slice(2);
const command = args[0];

if (!command) {
  console.log("Structogen CLI - Code Generation Tool");
  console.log("\nUsage: structogen <command> [options]");
  console.log("\nCommands:");
  console.log("  generate   - Generate code from schema");
  console.log("  init       - Initialize a new structogen project");
  console.log("  validate   - Validate a schema file");
  console.log("\nExample: structogen generate --schema schema.json --output ./src");
  process.exit(0);
}

switch (command) {
  case "generate":
    new GenerateCommand().execute();
    break;
  case "init":
    new InitCommand().execute();
    break;
  case "validate":
    new ValidateCommand().execute();
    break;
  default:
    console.error(`Unknown command: ${command}`);
    process.exit(1);
}
