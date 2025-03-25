import k from 'kleur'

const main = {
  arrowUp: '↑',
  arrowDown: '↓',
  arrowLeft: '←',
  arrowRight: '→',
  radioOn: '◉',
  radioOff: '◯',
  tick: '✔',
  cross: '✖',
  ellipsis: '…',
  pointerSmall: '›',
  line: '─',
  pointer: '❯'
}

const win = {
  arrowUp: main.arrowUp,
  arrowDown: main.arrowDown,
  arrowLeft: main.arrowLeft,
  arrowRight: main.arrowRight,
  radioOn: '(*)',
  radioOff: '( )',
  tick: '√',
  cross: '×',
  ellipsis: '...',
  pointerSmall: '»',
  line: '─',
  pointer: '>'
}

const figures = process.platform === 'win32' ? win : main

export const symbols = Object.freeze({
  aborted: k.red(figures.cross),
  done: k.green(figures.tick),
  exited: k.yellow(figures.cross),
  notice: k.yellow('!'),
  default: k.cyan('?')
})
