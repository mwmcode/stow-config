import { normalize } from '@std/path';
import { Checkbox, Input, prompt, Toggle } from '@cliffy/prompt';
import type { CheckboxOption } from '@cliffy/prompt';
import { validateDirInput } from './validateDirExists.ts';
import type { PromptResult } from './types.ts';
import { logger } from './logger.ts';

export async function runPrompt() {
  const configFiles: CheckboxOption<string>[] = [];
  let hasCreatedDestDir = false;

  return (await prompt([
    {
      name: 'configDir',
      type: Input,
      files: true,
      message: logger.prompt('Enter path to `configs` directory'),
      transform: normalize,
      after: async ({ configDir }, next) => {
        configDir = configDir as string;
        const configsDirFullpath = normalize(configDir);
        const dirValidatoin = validateDirInput(configDir);
        if (dirValidatoin === 'is-directory') {
          for await (
            const { isSymlink, name } of Deno.readDir(
              configsDirFullpath,
            )
          ) {
            if (isSymlink) continue;
            configFiles.push({ name, value: name });
          }
          if (!configFiles.length) {
            logger.error(`${logger.underline(configDir)} contains no configs!`);
            await next('configDir');
          }
          logger.emptyLine();
          await next();
        } else if (['is-new', 'is-file'].includes(dirValidatoin)) {
          logger.error(
            `No such directory (${
              logger.underline(
                configDir,
              )
            }). Please try again`,
          );
          await next('configDir');
        }
      },
    },
    {
      name: 'destDir',
      type: Input,
      files: true,
      message: logger.prompt('Enter path to `destination` directory'),
      transform: normalize,
      after: async ({ destDir, configDir }, next) => {
        const dirValidation = validateDirInput(destDir as string);
        if (destDir === configDir) {
          logger.error(
            `${
              logger.underline(
                destDir,
              )
            } cannot be the same as configs (source) directory`,
          );
          await next('destDir');
        }
        if (dirValidation === 'is-file') {
          logger.error(`${logger.underline(destDir)} must be a directory`);
          await next('destDir');
        }
        if (dirValidation === 'is-new') {
          logger.info(`${logger.underline(destDir)} does not exist yet.`);
          await next('shouldCreateDestDir');
        }
        if (dirValidation === 'is-directory') {
          logger.emptyLine();
          await next('pickConfigs');
        }
      },
    },
    {
      name: 'shouldCreateDestDir',
      message: logger.prompt('Would you like to create it?'),
      type: Toggle,
      after: async ({ shouldCreateDestDir, destDir }, next) => {
        if (!shouldCreateDestDir) {
          logger.emptyLine();
          await next('destDir');
        }
        await Deno.mkdir(destDir as string, { recursive: true });
        hasCreatedDestDir = true;
        await next();
      },
    },
    {
      name: 'pickConfigs',
      type: Checkbox,
      search: true,
      searchLabel: logger.italic('(type to filter 🔎)').toString(),
      message: logger.prompt('Select config(s)'),
      options: configFiles,
      maxRows: 25,
      confirmSubmit: false,
      after: async ({ pickConfigs, destDir }, next) => {
        if (!pickConfigs?.length) {
          logger.info("You didn't pick any configs");
          if (hasCreatedDestDir) {
            Deno.remove(normalize(destDir as string), { recursive: true });
          }
        }
        await next();
      },
    },
  ])) satisfies PromptResult;
}
