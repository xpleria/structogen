import { expandHome } from "@xpleria/structogen-utils";

export const DEFAULT_USER_PLUGIN_DIRECTORY = expandHome("~/.structogen/plugins");

export class PluginDiscovery {
  discoverAutomatically(): void {
    // TODO: Discover plugins from workspace and user plugin directories.
  }

  discoverFromConfig(): void {
    // TODO: Discover plugins from an explicit configuration override.
  }
}
