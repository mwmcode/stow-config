import { Checkbox } from '@cliffy/prompt';
import type { CheckboxOption } from '@cliffy/prompt';

export async function pickConfigs(configsDir: string) {
  const options: CheckboxOption<string>[] = [];

  for await (const { isSymlink, name } of Deno.readDir(configsDir)) {
    if (isSymlink) continue;
    options.push({ name, value: name });
  }

  return await Checkbox.prompt({
    search: true,
    searchLabel: 'Type to filter 🔎',
    message: 'Pick a config option',
    options,
    maxRows: 25,
    confirmSubmit: false,
  });
}
