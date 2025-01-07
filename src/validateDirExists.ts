// import { isAbsolute, join, normalize } from '@std/path';

// export function getFullPath(input: string) {
//   return isAbsolute(input) ? input : join(Deno.cwd(), normalize(input));
// }

/**
 * @returns ```
 * - 'is-dirctory'
 * - 'is-file'
 * - 'is-new'
 * ```
 * @throws Error
 */
export function validateDirInput(dirPath: string) {
  try {
    if (Deno.lstatSync(dirPath).isDirectory) {
      return 'is-directory';
    } else {
      return 'is-file';
    }
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return 'is-new';
    } else {
      throw error;
    }
  }
}
