import os from "os";
import path from "path";

/**
 * Expands a leading "~" into the user's home directory.
 * "~" → "/home/user"
 * "~/folder" → "/home/user/folder"
 */
export function expandHome(p: string): string {
  if (p === "~") {
    return os.homedir();
  }

  if (p.startsWith("~/")) {
    return path.join(os.homedir(), p.slice(2));
  }

  return p;
}
