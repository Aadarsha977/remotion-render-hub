import { Config } from "@remotion/cli/config";

// Keep your laptop cool:
// Local Remotion Studio runs with minimal CPU/RAM footprint
Config.setConcurrency(1);
Config.setLogLevel("info");
