import { prompt, Input, Toggle } from '@cliffy/prompt';

export async function enterDestinationDir() {
  return await prompt([
    {
      name: 'destDir',
      type: Input,
      files: true,
      message: 'Enter path to 📂 destination directory',
      after: async ({ destDir }, next) => {
        if (!destDir) {
          return await next('destDir');
        }
        try {
          if (Deno.lstatSync(destDir as string).isDirectory) {
            return await next(null);
          } else {
            console.error(`\n${destDir} is not a directory 📂\n`);
            return await next('destDir');
          }
        } catch (error) {
          if (error instanceof Deno.errors.NotFound) {
            console.info(`${destDir} does not exist`);
            return await next('shouldCreateDestDir');
          } else {
            console.error(`\n${error}`);
            Deno.exit(1);
          }
        }
      },
    },
    {
      name: 'shouldCreateDestDir',
      message: 'Would you like to create it?',
      type: Toggle,
      after: async ({ shouldCreateDestDir, destDir }, next) => {
        if (!shouldCreateDestDir) {
          return await next('destDir');
        }
        try {
          await Deno.mkdir(destDir as string, { recursive: true });
          return await next();
        } catch (error) {
          console.error(`\n${error}`);
          Deno.exit(1);
        }
      },
    },
  ]);
}
