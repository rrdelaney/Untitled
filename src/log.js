// @flow

import chalk from 'chalk'

const formatType = (type: string = 'MESSAGE', color: string = 'white') =>
  chalk[color](type.padEnd(8))

export default function log(
  message: string | Error,
  type?: string,
  color?: string = 'white'
) {
  if (typeof message === 'string') {
    console.log(`${formatType(type, color)} ${message}`)
  } else {
    console.error(`${chalk.red('ERROR'.padEnd(8))} ${message.message}`)
    console.error(chalk.red(message.stack))
  }
}
