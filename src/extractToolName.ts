/**
 * @example `.zshrc` => `zsh`, `.prettierrc.js` => `prettier`
 */
export function extractToolName(configDir: string) {
  return configDir
    .replace(/^\./, '')
    .split('.')[0]
    .replace(/\.?rc$/, '');
}
