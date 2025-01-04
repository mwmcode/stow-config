import { Toggle } from '@cliffy/prompt';

export async function askToUseDefaultConfigsDir(defaultDir: string) {
  return await Toggle.prompt(`Use 📂 ${defaultDir} to search for configs?`);
}
