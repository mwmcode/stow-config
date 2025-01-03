import { Input, Toggle } from '@cliffy/prompt';
import { transformInput } from './helpers/transformInput.ts';

const defaultConfigDir = `${Deno.env.get('HOME')}/.config`;

function checkDefaultConfigsDirExists() {
  try {
    return Deno.lstatSync(defaultConfigDir).isDirectory;
  } catch {
    return false;
  }
}

export async function promptConfigDir() {
  const useDefault = checkDefaultConfigsDirExists() &&
    (await Toggle.prompt(`Use 📂 ${defaultConfigDir} to search for configs?`));

  if (useDefault) {
    return defaultConfigDir;
  }
  return await Input.prompt({
    files: true,
    message: 'Path path to `configs` directory',
    validate: (value) => {
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
