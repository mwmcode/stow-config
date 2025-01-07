import { colors } from '@cliffy/ansi/colors';

export const logger = {
  emptyLine: () => console.log('\n'),
  prompt: (msg: string) => colors.bgCyan(colors.black(msg)).toString(),

  success: (msg: string) => console.log(colors.bold.green('[SUCCESS]'), `${msg}\n`),
  error: (msg: string) => console.log(colors.bold.red('[ERROR]'), `${msg}\n`),
  warn: (msg: string) => console.log(colors.bold.yellow('[WARN]'), `${msg}\n`),
  info: (msg: string) => console.log(colors.bold.blue('[INFO]'), `${msg}\n`),

  underline: (msg: string) => colors.underline(msg),
  bold: (msg: string) => colors.bold(msg),
  italic: (msg: string) => colors.italic(msg),
};
