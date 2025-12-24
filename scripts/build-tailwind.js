const fs = require('fs')
const path = require('path')
const postcss = require('postcss')
const tailwind = require('@tailwindcss/postcss')
const autoprefixer = require('autoprefixer')

async function build() {
  const inputPath = path.resolve(__dirname, '../app/globals.css')
  const css = fs.readFileSync(inputPath, 'utf8')
  const result = await postcss([tailwind(), autoprefixer()]).process(css, { from: inputPath })
  const outDir = path.resolve(__dirname, '../public')
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'tailwind.css'), result.css)
  console.log('Wrote public/tailwind.css')
}

build().catch((err) => {
  console.error(err)
  process.exit(1)
})
