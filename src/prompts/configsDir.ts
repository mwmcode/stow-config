import { Input, Toggle } from '@cliffy/prompt';
import { transformInput } from './helpers/transformInput.ts';
import { checkDefaultConfigsDir } from './helpers/checkDeafultConfigsDir.ts';

export async function enterConfigDir() {
  const defaultDir = checkDefaultConfigsDir();

  if (
    defaultDir &&
    (await Toggle.prompt(`Use 📂 ${defaultDir} to search for configs?`))
  ) {
    return defaultDir;
  }
  return await Input.prompt({
    files: true,
    message: 'Path path to `configs` directory',
    validate: value => {
      const sourceDir = transformInput(value);
      try {
        return Deno.lstatSync(sourceDir).isDirectory;
      } catch (error) {
        console.error(`\n${error}`);
        Deno.exit(1);
      }
    },
  });
}
