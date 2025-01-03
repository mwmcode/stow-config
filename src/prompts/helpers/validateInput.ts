import { transformInput } from './transformInput.ts';

/**
 * @description validates directory exists
 * @returns string
 * @throws Error or Deno.errors.NotFound
 */
export function validateInput(value: string) {
  const transformedInput = transformInput(value);
  try {
    return Deno.lstatSync(transformedInput).isDirectory;
  } catch (error) {
    console.error(`\n${error}`);
    Deno.exit(1);
  }
}
