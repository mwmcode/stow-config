import { Checkbox, Input, prompt, Toggle } from '@cliffy/prompt';
import type { CheckboxOption } from '@cliffy/prompt';
import { getFullPath, validateDirInput } from '@/src/validateDirExists.ts';

async function callIt() {
  const configFiles: CheckboxOption<string>[] = [];

  const result = await prompt([
    {
      name: 'configDir',
      type: Input,
      files: true,
      message: 'Enter path to `configs` directory',
      transform: getFullPath,
      after: async ({ configDir }, next) => {
        const dirValidatoin = validateDirInput(configDir as string);
        if (dirValidatoin === 'is-directory') {
          await next();
        } else if (['is-new', 'is-file'].includes(dirValidatoin)) {
          console.error(`\nMake sure ${configDir} exists\n`);
          await next('configDir');
        }
      },
    },
    {
      name: 'destDir',
      type: Input,
      files: true,
      before: async ({ configDir }, next) => {
        for await (const { isSymlink, name } of Deno.readDir(
          configDir as string,
        )) {
          if (isSymlink) continue;
          configFiles.push({ name, value: name });
        }
        if (!configFiles.length) {
          console.error(`\n${configDir} contains no configs!\n`);
          await next('configDir');
        }
        await next();
      },
      message: 'Enter path to `destination` directory',
      transform: getFullPath,
      after: async ({ destDir }, next) => {
        const dirValidation = validateDirInput(destDir as string);
        if (dirValidation === 'is-directory') {
          await next('pickConfigs');
        }
        if (dirValidation === 'is-file') {
          console.error(`\n${destDir} must be a directory\n`);
          await next('destDir');
        }
        if (dirValidation === 'is-new') {
          console.info(`\n${destDir} does not exist yet.\n`);
          await next('shouldCreateDestDir');
        }
      },
    },
    {
      name: 'shouldCreateDestDir',
      message: 'Would you like to create it?',
      type: Toggle,
      after: async ({ shouldCreateDestDir, destDir }, next) => {
        if (!shouldCreateDestDir) {
          await next('destDir');
        }
        await Deno.mkdir(destDir as string, { recursive: true });
        await next();
      },
    },
    {
      name: 'pickConfigs',
      type: Checkbox,
      search: true,
      searchLabel: 'Type to filter 🔎',
      message: 'Pick config file(s)',
      options: configFiles,
      maxRows: 25,
      confirmSubmit: false,
    },
  ]);

  console.log(result);
}

callIt();
