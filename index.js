#!/usr/bin/env node
// msqconsole — msfconsole 風のランダム・モスキート(蚊) ASCII アートバナー
//
// 単独で動きます。外部依存はゼロ（Node 標準機能のみ）。
// このファイル 1 つをどこにでもコピーすれば実行できます。
//
// 使い方:
//   ./msqconsole                # ランダムに 1 つ表示
//   node msqconsole             # 同上（実行権限が無い場合）
//   ./msqconsole -n 3           # 蚊アート #3 を表示
//   ./msqconsole --list         # 全アートを表示
//   ./msqconsole --no-color     # カラー無効
//   ./msqconsole -h             # ヘルプ

const args = process.argv.slice(2)

const hasFlag = (...names) => names.some((n) => args.includes(n))
const getOpt = (...names) => {
  for (const n of names) {
    const i = args.indexOf(n)
    if (i !== -1 && args[i + 1]) return args[i + 1]
  }
  return undefined
}

const noColor = hasFlag("--no-color") || process.env.NO_COLOR || !process.stdout.isTTY
const c = (code, s) => (noColor ? s : `\x1b[${code}m${s}\x1b[0m`)
const red = (s) => c("1;31", s)
const dim = (s) => c("2", s)
const cyan = (s) => c("1;36", s)
const green = (s) => c("1;32", s)
const yellow = (s) => c("1;33", s)
const white = (s) => c("1;37", s)

const banners = [
  {
    caption: "MSQ // the bloodsucker is in your network",
    art: String.raw`
        \         /
         \       /
          \.   ./
       __  \\\|///  __
      /  \  '\|/'  /  \
     |    \__\|/__/    |
      \      (_)      /
       '.    /|\    .'
         '._/_|_\_.'
           / | \
          /  |  \
         '   '   '
`,
  },
  {
    caption: "MSQ // zero-day proboscis engaged",
    art: String.raw`
            __
       _.--""  \
     .'  ___    \        .
    /   /   \    \      /|
   |   |  o  |    \    / |
    \   \___/  .--.\  /  |
     '.____.--'    \\/   |
        |||  .------\\---'
        |||_/        \\
        '--'  buzz... '\
                        \
`,
  },
  {
    caption: "MSQ // injection vector: epidermis",
    art: String.raw`
      .-.                 .-.
       \ \   .-""-.      / /
        \ \ /      \    / /
         \ X  o  o  X  / /
          \|    <>   |/ /
           \  '----'  /
            '-.____.-'
              | || |
             _| || |_
            '---||---'
                ||
                ||
              --''--
`,
  },
  {
    caption: "MSQ // payload delivered intravenously",
    art: String.raw`
                  ___
              .-''   ''-.
            .'           '.
           /   .-.   .-.   \
          |   /   \ /   \   |
          |   \   / \   /   |
           \   '-'   '-'   /
            '.    ^    .'
              '-.___.-'
             .-' /|\ '-.
            /   / | \   \
           '   '  |  '   '
                 \|/
                  '
`,
  },
  {
    caption: "MSQ // root access via blood meal",
    art: String.raw`
       \  \      |      /  /
        \  \     |     /  /
         \  '-._ | _.-'  /
          '-._  '#'  _.-'
              '-./ \.-'
               / o o \
              |  \_/  |
               \ === /
            .---'._.'---.
           /     |||     \
          '      |||      '
                 '|'
                  |
                _/ \_
`,
  },
  {
    caption: "MSQ // swarm initialized, targets acquired",
    art: String.raw`
     ~  >}-  ~   -{<  ~   >}- ~
        .-~~~-.       .-~~~-.
       (  o o  )     (  o o  )
        )  ^  (       )  ^  (
       /  '-'  \     /  '-'  \
      '~~|   |~~'   '~~|   |~~'
         | | |         | | |
         '-'-'         '-'-'
     ~   -{<  ~   >}-  ~  -{<  ~
`,
  },
]

function printHelp() {
  process.stdout.write(
    [
      white("msqconsole") + dim(" — random mosquito ASCII banner (msfconsole style)"),
      "",
      yellow("usage:"),
      "  msqconsole [options]",
      "",
      yellow("options:"),
      "  -n, --number <N>   show banner #N (1.." + banners.length + ")",
      "  --list             show all banners",
      "  --no-color         disable ANSI colors",
      "  -h, --help         show this help",
      "",
    ].join("\n"),
  )
}

function printBanner(b) {
  process.stdout.write(red(b.art) + "\n")
  process.stdout.write("       " + dim(b.caption) + "\n\n")
}

function printInfoBlock() {
  const exploits = 1387 + Math.floor(Math.random() * 200)
  const payloads = 423 + Math.floor(Math.random() * 50)
  const lines = [
    ["msqconsole", "v6.6.6-dev"],
    [`${exploits} bites`, `- ${payloads} payloads`],
    [`${banners.length} mosquito banners`, "- 1 swarm"],
  ]
  for (const [a, bb] of lines) {
    process.stdout.write(dim("       =[ ") + white(a) + " " + green(bb) + dim(" ]") + "\n")
  }
  process.stdout.write("\n")
}

function main() {
  if (hasFlag("-h", "--help")) {
    printHelp()
    return
  }

  if (hasFlag("--list")) {
    banners.forEach((b, i) => {
      process.stdout.write(yellow(`--- #${i + 1} ---`) + "\n")
      printBanner(b)
    })
    return
  }

  let index
  const n = getOpt("-n", "--number")
  if (n !== undefined) {
    index = Math.max(0, Math.min(banners.length - 1, parseInt(n, 10) - 1))
    if (Number.isNaN(index)) index = 0
  } else {
    index = Math.floor(Math.random() * banners.length)
  }

  process.stdout.write("\n")
  printBanner(banners[index])
  printInfoBlock()
  process.stdout.write(
    cyan("msq") + dim(" > ") + dim("type ") + white("banner -r") + dim(" to reswarm") + "\n",
  )
}

main()
