import { stowConfig } from './src/mod.ts';

if (!import.meta.main) {
  console.error('This script must be run in standalone mode.');
  Deno.exit(1);
}

stowConfig();
