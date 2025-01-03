/**
 * @description expands env vars (if any)
 * @example `$HOME/somepath` ==> `/Users/NAME/somepath`
 */
export function transformInput(input: string) {
  if (!input.includes('$')) {
    return input;
  }
  return input
    .split('/')
    .map((chunk) =>
      chunk.replace(
        /\$(\w+)/g,
        (_, variable) => Deno.env.get(variable) || `$${variable}`,
      )
    )
    .join('/');
}
