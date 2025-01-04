import { join } from '@std/path/join';
import * as prompt from './prompts/index.ts';
import { displayResults } from './displayResults.ts';

export async function stowConfig() {
  const configsDir = await prompt.enterConfigDir();
  const destinationDir = await prompt.enterDestinationDir();
  const selectedConfigs = await prompt.pickConfigs(configsDir);

  for (const config of selectedConfigs) {
    const sourcePath = join(configsDir, config);
    const targetPath = join(destinationDir, config);
    // move config to target
    await Deno.rename(sourcePath, targetPath);
    // symlink it from target to configsDir
    await Deno.symlink(targetPath, sourcePath);
  }

  await displayResults({ names: selectedConfigs, configsDir });
}
