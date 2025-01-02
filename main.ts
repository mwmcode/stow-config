import { validateArgs } from './src/validateArgs.ts';
import { stowConfig } from './src/stowConfig.ts';
import { executeCommand } from './src/command.ts';

if (!import.meta.main) {
  console.error('This script must be run in standalone mode.');
  Deno.exit(1);
}

const { options, cmd } = await executeCommand();

try {
  const args = validateArgs(options);
  await stowConfig(args);
} catch (error) {
  cmd.throw(error);
}
