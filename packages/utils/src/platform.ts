export type NormalizedPlatform = "windows" | "mac" | "linux";

export function normalizePlatform(p: NodeJS.Platform): NormalizedPlatform {
  switch (p) {
    case "win32":
      return "windows";
    case "darwin":
      return "mac";
    default:
      return "linux"; // covers linux, freebsd, openbsd, sunos, aix
  }
}
