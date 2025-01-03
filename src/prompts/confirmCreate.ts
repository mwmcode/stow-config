import { Toggle } from '@cliffy/prompt';

export async function confirmCreate(destDir: string) {
  const yes = await Toggle.prompt(`\n📂 ${destDir} does not exist, create it?`);
  if (!yes) {
    return false;
  }
  try {
    await Deno.mkdir(destDir, { recursive: true });
    return true;
  } catch (error) {
    console.error(`\n${error}`);
    return false;
  }
}
