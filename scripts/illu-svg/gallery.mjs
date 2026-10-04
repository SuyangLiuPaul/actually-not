import sharp from 'sharp'
import { canvas, at, C } from './lib.mjs'
import { M } from './motifs.mjs'
const names = Object.keys(M)
const out = process.argv[2]
const per = 8
const sheets = []
for (let p = 0; p < Math.ceil(names.length / per); p++) {
  let body = ''
  names.slice(p * per, p * per + per).forEach((n, i) => {
    body += at(70 + i * 112, 250, M[n](), 0.62)
    body += `<text x="${70 + i * 112}" y="300" font-size="13" text-anchor="middle" fill="${C.ink2}" font-family="Helvetica">${n}</text>`
  })
  sheets.push(await sharp(Buffer.from(canvas('warm', body))).png().toBuffer())
}
await sharp({ create: { width: 960, height: 320 * sheets.length, channels: 3, background: '#fff' } })
  .composite(sheets.map((b, i) => ({ input: b, top: i * 320, left: 0 }))).png().toFile(out)
