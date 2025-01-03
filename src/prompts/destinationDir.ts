import { Input } from '@cliffy/prompt';
import { transformInput } from './helpers/transformInput.ts';
import { confirmCreate } from './confirmCreate.ts';

export async function promptDestinationDir() {
  return await Input.prompt({
    files: true,
    message: 'Enter path to `destination` directory',
    hint: 'Location to move congis to?',
    transform: transformInput,
    validate: async value => {
      const destDir = transformInput(value);
      try {
        return Deno.lstatSync(destDir).isDirectory;
      } catch (error) {
        if (error instanceof Deno.errors.NotFound) {
          return await confirmCreate(destDir);
        } else {
          console.error(`\n${error}`);
          Deno.exit(1);
        }
      }
    },
  });
}
