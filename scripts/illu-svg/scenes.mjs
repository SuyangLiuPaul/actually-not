import { at } from './lib.mjs'
import { M } from './motifs.mjs'

/**
 * 每条的手绘场景：tint 是板块底色，body() 返回 SVG 片段。
 * 内容放在画布中央横带（y≈70–260），卡片里是 3:1 的横幅裁切。
 * 约定：不画真人肖像、不含文字；红色只在"不对/划掉"的点睛处出现一次。
 */
export const SCENES = {
  'luxun-coffee': {
    tint: 'quote',
    body: () =>
      at(330, 258, M.sheet({ strike: 2 }), 1.05, -4) +
      at(480, 258, M.coffee(), 1.25) +
      at(640, 258, M.ink(), 1.2) +
      at(690, 258, M.brush(), 0.95, 14),
  },
}
