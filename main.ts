import { join } from '@std/path/join';
import * as prompt from './src/prompts/index.ts';

if (!import.meta.main) {
  console.error('This script must be run in standalone mode.');
  Deno.exit(1);
}

const configsDir = await prompt.promptConfigDir();
const destinationDir = await prompt.promptDestinationDir();

const selectedConfigs = await prompt.pickConfigs(configsDir);

for (const config of selectedConfigs) {
  const sourcePath = join(configsDir, config);
  const targetPath = join(destinationDir, config);
  // move config to target
  await Deno.rename(sourcePath, targetPath);
  // symlink it from target to configsDir
  await Deno.symlink(targetPath, sourcePath);
}

console.log('✅ done!');