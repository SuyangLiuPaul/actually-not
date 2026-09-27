/** Original themed dioramas. No real neighbourhood/culture is claimed to look like this. */
import { Builder } from '../game/renderer.js';
import { Navigation } from '../game/navigation.js';
import { gardenTree } from '../game/atelier.js';
import { book, toyDuck, lantern } from '../game/craft.js';
import { blossom } from '../game/playyard-scene.js';
import { scienceStatic, rod } from '../game/science-scenes.js';
import { REGIONS, regionContains, regionWater, regionWalkHeight } from './atlas.js';
import { buildThemedRegion, drawThemedRegion } from './world-themes.js';
const C = { wood: '#b58a60', light: '#e1c49b', cream: '#fff0d1', ink: '#4c6c67', leaf: '#8bb881', rose: '#dfa6a5', teal: '#7aaba8' };
function box(b, x, y, z, w, h, d, c, ry = 0, flag = 0, hide = '') { b.add('bevel', x, y, z, w, h, d, c, 0, ry, 0, flag, hide); }
function planter(b, x, z, w = 1.2, c = C.rose) {
    box(b, x, .36, z, w, .4, .65, C.light);
    box(b, x, .58, z, w + .08, .065, .74, C.cream);
    box(b, x, .58, z, w - .12, .03, .54, '#6e7c55');
    for (let i = 0; i < Math.floor(w / .25); i++)
        blossom(b, x - w * .37 + i * .25, .93 + (i % 2) * .07, z, .29, i % 2 ? c : '#efcf87');
}
function roundTree(b, nav, x, z, s = .9, pink = false) {
    const start = b.count;
    gardenTree(b, x, z, s, false);
    if (pink)
        for (let i = start; i < b.count; i++)
            if (b.items[i].shape === 'crown') {
                b.items[i].color = [.88 + (i % 3) * .027, .66 + (i % 3) * .055, .69 + (i % 3) * .043];
            }
    nav.obstacles.push({ x, z, w: .4 * s, d: .4 * s, round: true });
}
function bench(b, nav, x, z) {
    for (let i = 0; i < 5; i++)
        box(b, x, .66, z + (i - 2) * .13, 1.9, .085, .11, C.light);
    for (const s of [-1, 1]) {
        box(b, x + s * .68, .4, z, .1, .53, .8, C.ink);
        box(b, x + s * .68, .94, z - .39, .1, .8, .1, C.ink);
    }
    for (let j = 0; j < 3; j++)
        box(b, x, .89 + j * .16, z - .4, 1.92, .12, .09, C.light);
    nav.obstacles.push({ x, z, w: 1.94, d: .88 });
}
function lamp(b, x, z, japanese = false) {
    box(b, x, .25, z, .4, .18, .4, C.wood);
    box(b, x, 1.1, z, .07, 1.8, .07, C.ink);
    box(b, x, 1.94, z, .45, .55, .38, japanese ? '#edc1a6' : '#f5dfab');
    for (const s of [-1, 1])
        box(b, x + s * .19, 1.94, z + .2, .035, .56, .035, C.wood);
    b.add('roof', x, 2.32, z, .65, .24, .58, japanese ? '#666f6b' : C.teal);
    box(b, x, 1.65, z, .52, .055, .45, C.wood);
}
function bridge(b, nav, id, z) {
    const cx = id === 'nl' ? 8 : -.9, w = id === 'nl' ? 3 : 4;
    for (let i = 0; i < 18; i++) {
        const x = cx - w / 2 + (i + .5) * w / 18, y = regionWalkHeight(id, x, z);
        box(b, x, y - .065, z, w / 18 - .012, .13, 1.43, C.light);
        for (const s of [-1, 1])
            b.add('sphere', x, y + .013, z + s * .53, .026, .016, .026, C.ink);
    }
    for (const s of [-1, 1]) {
        let previous = null;
        for (let i = 0; i < 7; i++) {
            const x = cx - w / 2 + i * w / 6, y = regionWalkHeight(id, x, z);
            box(b, x, y + .44, z + s * .79, .08, .91, .08, C.wood);
            nav.obstacles.push({ x, z: z + s * .79, w: .11, d: .11 });
            const p = [x, y + .87, z + s * .79];
            if (previous)
                rod(b, previous, p, .07, C.wood);
            previous = p;
        }
    }
}
function roofTiles(b, x, y, z, w, d, c) {
    b.add('roof', x, y, z, w, 1.05, d, c);
    for (const side of [-1, 1])
        for (let row = 0; row < 5; row++) {
            const t = (row + .5) / 5, xx = x + side * t * w / 2, yy = y + .525 - t * 1.05 + .045;
            for (let j = 0; j < Math.ceil(d / .38); j++)
                box(b, xx, yy, z - d / 2 + (j + .5) * d / Math.ceil(d / .38), w / 10 + .08, .07, d / Math.ceil(d / .38) - .017, c, 0, 3);
        }
    box(b, x, y + .59, z, .18, .16, d + .07, c);
}
function windowFrame(b, x, y, z, w = .8, h = .95, c = C.cream) {
    box(b, x, y, z, w + .16, h + .16, .15, C.wood);
    box(b, x, y, z + .095, w, h, .04, '#a9ccc5', 0, 5);
    for (const s of [-1, 1]) {
        box(b, x + s * w / 2, y, z + .13, .06, h + .08, .055, c);
        box(b, x, y + s * h / 2, z + .13, w + .06, .06, .055, c);
    }
    box(b, x, y, z + .13, .045, h, .06, c);
    box(b, x, y, z + .13, w, .045, .06, c);
}
function bathHouse(b, nav, x, z, c) {
    box(b, x, 1.3, z, 2.1, 2.25, 2.35, c);
    for (let i = 0; i < 8; i++)
        box(b, x - .93 + i * .267, 1.3, z + 1.19, .04, 2.12, .035, C.cream);
    roofTiles(b, x, 2.89, z, 2.5, 2.66, C.cream);
    box(b, x, .24, z + 1.35, 2.3, .22, .6, C.light);
    box(b, x, .93, z + 1.25, .76, 1.37, .07, C.cream);
    box(b, x, .97, z + 1.31, .56, 1.1, .035, c);
    b.add('sphere', x + .2, 1, z + 1.36, .06, .06, .04, C.ink);
    windowFrame(b, x, 2.02, z + 1.2, .48, .4);
    nav.obstacles.push({ x, z, w: 2.22, d: 2.48 });
}
function japaneseHouse(b, nav, x, z, w) {
    box(b, x, .35, z, w + .32, .4, 3.4, '#bcb7a0');
    box(b, x, 1.54, z, w, 2.2, 3.1, '#eadcc2');
    for (let i = 0; i <= Math.ceil(w / .4); i++)
        box(b, x - w / 2 + i * w / Math.ceil(w / .4), 1.38, z + 1.58, .075, 2.35, .08, C.wood);
    for (let y = .62; y < 2.8; y += .34)
        box(b, x, y, z + 1.6, w + .1, .055, .07, C.wood);
    for (const s of [-1, 1]) {
        windowFrame(b, x + s * w * .24, 1.77, z + 1.64, .84, .92, '#aa8660');
        for (let j = -2; j <= 2; j++)
            box(b, x + s * w * .24 + j * .145, 1.77, z + 1.84, .04, .95, .035, C.wood);
    }
    box(b, x, 1.24, z + 1.7, .88, 1.78, .13, C.wood);
    box(b, x, 1.65, z + 1.79, .66, .76, .02, '#e7e3c5');
    for (const s of [-1, 1])
        box(b, x + s * .22, 1.65, z + 1.82, .025, .76, .026, C.wood);
    roofTiles(b, x, 3.1, z, w + 1, 4.05, '#708782');
    for (const s of [-1, 1])
        box(b, x + s * (w / 2 + .43), 2.65, z, .25, .14, 4.12, '#61716b');
    box(b, x, .36, z + 2, w + .6, .25, 1.1, C.light);
    for (let i = 0; i < 12; i++)
        box(b, x - w / 2 + i * w / 11, .495, z + 2, .015, .014, 1, C.wood);
    nav.obstacles.push({ x, z, w: w + .13, d: 3.25 }, { x, z: z + 2, w: w + .64, d: 1.15 });
    for (const s of [-1, 1]) {
        lamp(b, x + s * (w / 2 - .35), z + 2, true);
        planter(b, x + s * (w / 2 + .3), z + 2.9, .8);
    }
}
function canalHouse(b, nav, x, z, c, h = 4.3) {
    const w = 2.5;
    box(b, x, h / 2 + .3, z, w, h, 2.6, c);
    box(b, x, .3, z, w + .24, .3, 2.9, C.cream);
    for (let row = 0; row < 3; row++)
        for (const side of [-1, 1])
            windowFrame(b, x + side * .57, .96 + row * 1.23, z + 1.33, .62, .81);
    for (let y = .6; y < h; y += .27)
        box(b, x, y, z + 1.309, w, .021, .014, c === '#b98476' ? '#c89481' : '#a9bdb0');
    // Stepped gable, side cheeks, and ridge coping form a distinct silhouette.
    for (let tier = 0; tier < 4; tier++) {
        const ww = w - tier * .48;
        box(b, x, h + .26 + tier * .25, z + 1.23, ww, .3, .3, c);
        box(b, x, h + .45 + tier * .25, z + 1.26, ww + .06, .07, .36, C.cream);
    }
    b.add('roof', x, h + .5, z - .1, w + .16, 1.0, 2.72, '#657f7b');
    windowFrame(b, x, h + .49, z + 1.44, .46, .44);
    box(b, x, .8, z + 1.39, .48, 1.15, .12, C.ink);
    planter(b, x, z + 1.89, 1.2);
    nav.obstacles.push({ x, z, w: 2.65, d: 2.92 });
}
function tulips(b, x, z, w, d) {
    box(b, x, .22, z, w, .17, d, '#d8d6b6');
    for (let r = 0; r < 3; r++)
        for (let k = 0; k < 10; k++) {
            const xx = x - w * .43 + k * w * .86 / 9, zz = z - d * .36 + r * d * .72 / 2, c = ['#df9b97', '#f3d082', '#e9bdbb'][r];
            b.add('cylinder', xx, .52, zz, .025, .54, .025, '#7caa73');
            b.add('soft', xx + .06, .47, zz, .12, .23, .05, '#92b378', 0, 0, -.4);
            b.add('soft', xx, .83, zz, .21, .28, .19, c);
            for (const s of [-1, 1])
                b.add('soft', xx + s * .064, .93, zz, .065, .15, .12, c);
        }
}
export function buildRegion(id, b, nav) {
    const r = REGIONS[id], [l, h, t, d] = r.bounds, cx = (l + h) / 2, cz = (t + d) / 2;
    nav.surface = { inside: (x, z, m) => regionContains(id, x, z, m), water: (x, z, m) => regionWater(id, x, z, m), height: (x, z) => regionWalkHeight(id, x, z), trail: () => 0 };
    if (id !== 'au' && id !== 'jp' && id !== 'nl') {
        buildThemedRegion(id, b, nav);
        return;
    }
    box(b, cx, -.25, cz, h - l + .15, .5, d - t + .15, '#c7bca0');
    if (id === 'au') {
        box(b, cx, .05, cz, h - l, .22, d - t, '#e8d7ad');
        box(b, -10.3, .16, -2.1, 20, .02, 18.6, '#9fba90');
        box(b, 3.3, .115, cz, 4.15, .12, d - t, '#83c6ce', 0, 2);
        for (let i = 0; i < 22; i++) {
            const z = t + .4 + i * .94;
            box(b, 1.3, .163, z, .34, .022, .79, '#efead0');
            box(b, 2.14 + (i % 3) * .24, .19, z + .16, .59, .018, .023, '#c4e0dc');
        }
        for (let i = 0; i < 52; i++)
            box(b, -5.0, .178, t + .5 + i * .40, 1.7, .035, .375, i % 3 ? C.light : '#d4b087');
        for (let i = 0; i < 24; i++)
            box(b, -14.8 + i * .65, .183, 5.4, .64, .035, 1.5, C.light);
        for (const [x, c] of [[-16, '#a5c4bf'], [-13, '#deb1a2'], [-10, '#dfcc93']])
            bathHouse(b, nav, x, -8, c);
        // Lighthouse on the shore — layered plinth, door, gallery and glazing.
        const x = -1.2, z = -7;
        b.add('cylinder', x, .42, z, 3.1, .5, 3.1, '#d9cdb1');
        for (let row = 0; row < 7; row++)
            b.add('cylinder', x, .95 + row * .58, z, 1.73 - row * .072, .60, 1.73 - row * .072, row % 2 ? '#dda297' : C.cream);
        b.add('cylinder', x, 4.87, z, 2.08, .18, 2.08, C.light);
        b.add('cylinder', x, 5.32, z, 1.26, .72, 1.26, '#b6dbce');
        for (let i = 0; i < 10; i++) {
            const a = i * Math.PI / 5;
            box(b, x + Math.cos(a) * .92, 5.15, z + Math.sin(a) * .92, .055, .47, .055, C.ink);
        }
        b.add('torus', x, 5.36, z, .99, .34, .99, C.ink);
        b.add('cone', x, 5.97, z, 1.73, .66, 1.73, '#79a8a3');
        b.add('sphere', x, 6.4, z, .17, .22, .17, C.wood);
        box(b, x, 1, z + .85, .53, 1.04, .08, C.teal);
        nav.obstacles.push({ x, z, w: 3.15, d: 3.15, round: true });
        for (const [x, z, s] of [[-18, -2, 1.3], [-16, 2, 1], [-18, 7, 1.1], [-2, 6, .9]])
            roundTree(b, nav, x, z, s);
        bench(b, nav, -9, 7.2);
        planter(b, -13, 6.9, 2);
        planter(b, -3.3, 2.4, 1.6);
        for (const x of [-14, -4])
            lamp(b, x, 5.8);
        // Docking garden remains the same authored UV mechanism, not a local UV forecast.
        for (let i = 0; i < 12; i++)
            box(b, -12.4 + i * .48, .225, -.8, .45, .13, 4.9, '#decdab');
        nav.obstacles.push({ x: -10.8, z: -1.5, w: .45, d: .45, round: true });
        roundTree(b, nav, -10.8, -1.5, 1.0);
    }
    else if (id === 'jp') {
        box(b, cx, .05, cz, h - l, .22, d - t, '#afc09a');
        for (const z of [-4, 2.5, 9.5])
            for (let i = 0; i < 28; i++)
                box(b, .2 + i * .66, .182, z, .63, .035, 1.35, i % 3 ? '#d8d1b8' : '#e4dcca');
        for (let i = 0; i < 35; i++)
            box(b, 4, .18, -8 + i * .59, 1.36, .035, .56, i % 3 ? '#dbd5bd' : '#e7e1cc');
        japaneseHouse(b, nav, 8, -7.5, 5.2);
        japaneseHouse(b, nav, 16, -4, 3.1);
        b.add('soft', -.9, .11, 5, 3.2, .17, 6.6, '#8fbec4', 0, 0, 0, 2);
        for (let i = 0; i < 16; i++) {
            const a = i * Math.PI / 8;
            b.add('soft', -.9 + Math.cos(a) * 1.68, .26, 5 + Math.sin(a) * 3.42, .48, .32, .59, '#c6c4ad', 0, a);
        }
        bridge(b, nav, id, 4.7);
        for (const [x, z, s] of [[-.2, -6, 1.05], [15, 9.7, 1.3], [.2, 11.7, 1.1], [18, 3.9, 1.1], [17, -9, .85]])
            roundTree(b, nav, x, z, s, true);
        // Outdoor teaching table and sheltered wash station.
        box(b, 8, .19, -1, 4.8, .08, 4.6, '#e0cdb0');
        for (const x of [6.2, 9.8]) {
            box(b, x, 1.67, 4.6, .12, 3.05, .12, C.wood);
            nav.obstacles.push({ x, z: 4.6, w: .18, d: .18 });
        }
        box(b, 8, 3.19, 4.6, 4.2, .19, .19, C.wood);
        b.add('roof', 8, 3.6, 5.5, 4.8, .85, 3.4, '#859891', 0, 0, 0, 0, 'hands|food');
        box(b, 8, 1.18, 5.86, 4.25, .20, 2, C.light);
        for (const x of [6.35, 9.65])
            for (const z of [5.16, 6.56])
                box(b, x, .68, z, .14, .91, .14, C.wood);
        nav.obstacles.push({ x: 8, z: 5.9, w: 4.2, d: 2.1 }, { x: 8, z: -1, w: 2.2, d: 1.9 });
        bench(b, nav, 9.4, 10.2);
        for (const x of [2.3, 6, 12.5])
            lamp(b, x, 2.7, true);
        planter(b, 12, 8.8, 1.6);
        for (let i = 0; i < 4; i++) {
            const x = 14 + i * .8;
            box(b, x, .66, 12, .06, 1.03, .06, C.wood);
            box(b, x, .83, 12, .06, .06, .96, C.wood);
        }
        box(b, 15.2, .9, 12, 3.25, .06, .08, C.wood);
    }
    else {
        // Two banks with an actual blocked canal and two traversable arched bridges.
        box(b, 3.85, .05, cz, 5.7, .22, d - t, '#a9bd94');
        box(b, 15.45, .05, cz, 11.9, .22, d - t, '#a9bd94');
        box(b, 8, .105, cz, 2.6, .12, d - t, '#80bec7', 0, 2);
        for (const x of [6.58, 9.42]) {
            box(b, x, .23, cz, .26, .32, d - t, '#c6b79a');
            for (let i = 0; i < 44; i++)
                box(b, x, .30, t + i * .59, .29, .08, .56, '#e4d4b3');
        }
        for (let i = 0; i < 45; i++) {
            const z = t + .3 + i * .565;
            box(b, 10.65, .18, z, 1.4, .035, .55, i % 2 ? C.light : '#d3b88f');
        }
        for (const z of [-7.9, 2.4])
            bridge(b, nav, id, z);
        canalHouse(b, nav, 3.6, -9.7, '#ba8877', 4.15);
        canalHouse(b, nav, 3.9, -4.9, '#8eada3', 5);
        canalHouse(b, nav, 3.6, -.15, '#d3b785', 4.25);
        // Windmill tower, balcony, door and roof. Moving sails are in drawRegion().
        const x = 4.6, z = 7.1;
        b.add('cylinder', x, 2.08, z, 2.4, 3.8, 2.4, '#e4d2b0');
        for (let j = 0; j < 9; j++)
            b.add('torus', x, .44 + j * .41, z, 1.215, .2, 1.215, C.wood);
        b.add('cylinder', x, 3.73, z, 3.05, .14, 3.05, C.wood);
        b.add('cone', x, 4.69, z, 3.25, 2.04, 3.25, '#6f9290');
        box(b, x, 1.02, z + 1.19, .65, 1.34, .13, C.teal);
        windowFrame(b, x, 2.4, z + 1.2, .52, .54);
        for (let i = 0; i < 12; i++) {
            const a = i * Math.PI / 6;
            box(b, x + Math.cos(a) * 1.44, 4, z + Math.sin(a) * 1.44, .055, .54, .055, C.cream);
        }
        b.add('torus', x, 4.23, z, 1.5, .25, 1.5, C.cream);
        nav.obstacles.push({ x, z, w: 3.2, d: 3.2, round: true });
        const sb = new Builder(), sn = new Navigation();
        scienceStatic(sb, sn);
        for (let i = 0; i < sb.count; i++) {
            const o = sb.items[i];
            if (o.matrix[14] < 7) {
                b.items[b.count++] = o;
            }
        }
        for (const o of sn.obstacles)
            if (o.z < 7)
                nav.obstacles.push(o);
        tulips(b, 14, 8.5, 5.1, 2.1);
        tulips(b, 17, -12.5, 5, 1.6);
        bench(b, nav, 12.4, 7.1);
        for (const [x, z] of [[19.5, 7.8], [19, -11.4], [1.9, 3.3]])
            roundTree(b, nav, x, z, .9);
        for (const z of [-10, -1, 6])
            lamp(b, 10, z);
        planter(b, 12, -3, 1.3);
    }
    // Fine details are grouped at the edge of circulation, not scattered over the approaches.
    if (id === 'au') {
        for (let i = 0; i < 6; i++) {
            const x = -18.1 + i * .82;
            box(b, x, .59, -10.1, .085, .88, .085, C.cream);
        }
        for (const y of [.4, .85])
            box(b, -16.05, y, -10.1, 4.4, .055, .065, C.cream);
        nav.obstacles.push({ x: -16.05, z: -10.1, w: 4.4, d: .10 });
        for (const [x, z] of [[-18.2, 4], [-18.2, -7.9], [-7.5, -10], [-2.4, -2.5]]) {
            for (let j = 0; j < 6; j++) {
                const a = j * 1.04;
                b.add('soft', x + Math.cos(a) * .36, .32, z + Math.sin(a) * .31, .62, .32, .49, j % 2 ? '#c9c2ab' : '#d6ccac', 0, a);
            }
            for (let j = 0; j < 4; j++)
                b.add('soft', x + (j - 1.5) * .15, .61, z, .07, .65, .3, '#859f70', 0, j * .5, -.3 + j * .2);
        }
        // Rest corner with reading table and two pastel surfboards (scenery only).
        box(b, -13.7, .58, 2.6, 1.6, .17, 1.05, C.light);
        for (const q of [-1, 1])
            box(b, -13.7 + q * .5, .34, 2.6, .09, .58, .76, C.wood);
        book(b, -13.9, .74, 2.6, .42, .2);
        lantern(b, -13.2, .84, 2.6, .22);
        nav.obstacles.push({ x: -13.7, z: 2.6, w: 1.66, d: 1.11 });
        for (const [x, c] of [[-7.9, '#bdaca4'], [-7.35, '#9bc4c1']]) {
            b.add('soft', x, 1.2, -7.95, .4, 2.0, .16, c, 0, 0, -.12);
            box(b, x, 1.2, -7.85, .055, 1.9, .025, C.cream);
        }
        for (let j = 0; j < 7; j++) {
            const z = 6.5 + j * .4;
            blossom(b, -18.5 + j * .35, .61, z, .28, j % 2 ? '#efc38e' : '#e9b6ad');
        }
    }
    else if (id === 'jp') {
        for (let i = 0; i < 13; i++) {
            const x = 6.1 + i * .41;
            box(b, x, .68, 12.3, .075, 1.02, .08, C.wood);
        }
        for (const y of [.5, .95])
            box(b, 8.55, y, 12.3, 5.2, .075, .065, C.wood);
        nav.obstacles.push({ x: 8.55, z: 12.3, w: 5.2, d: .1 }, { x: 15.2, z: 12, w: 3.25, d: .1 });
        for (const [x, z] of [[18.9, -7.5], [18.7, 7.2], [1.2, -9], [12, -8.3]]) {
            for (let i = 0; i < 5; i++) {
                const xx = x + (i - 2) * .21, h = 1.4 + (i % 3) * .33;
                b.add('cylinder', xx, h / 2 + .18, z, .065, h, .065, '#819b67');
                for (let k = 0; k < 4; k++) {
                    const y = .5 + k * .37;
                    b.add('torus', xx, y, z, .042, .1, .042, '#b9c6a0');
                    b.add('soft', xx + .15, y + .12, z, .38, .12, .07, '#83a576', 0, i * .3, .38);
                }
            }
        }
        for (const z of [3.1, 6.5]) {
            b.add('soft', -.82, .219, z, .58, .025, .5, '#87aa8b');
            blossom(b, -.84, .29, z, .26, '#efd1ce');
        }
        // Scenery teacups beside the garden bench; not a health or tea-making experiment.
        box(b, 12.9, .65, 10.1, 1.18, .15, .82, C.wood);
        for (const q of [-1, 1])
            box(b, 12.9 + q * .4, .36, 10.1, .08, .6, .66, C.wood);
        for (const x of [12.65, 13.1]) {
            b.add('cylinder', x, .81, 10.1, .18, .23, .18, '#bad0c7');
            b.add('cylinder', x, .931, 10.1, .14, .012, .14, '#8c8461');
        }
        book(b, 12.98, .83, 9.85, .28, 0);
        nav.obstacles.push({ x: 12.9, z: 10.1, w: 1.22, d: .86 });
        for (let i = 0; i < 12; i++) {
            const a = i * .53;
            blossom(b, 15 + Math.cos(a) * 1.85, .59, 9.7 + Math.sin(a) * 1.8, .27, i % 2 ? '#eac0bf' : '#f3d8c1');
        }
    }
    else {
        // Small canal boat, mooring posts and garden bicycle: hand-made props, not science outcomes.
        b.add('soft', 8, .23, -1.5, 1.05, .42, 2.7, '#b68c64');
        b.add('soft', 8, .43, -1.5, .81, .20, 2.31, C.cream);
        for (const z of [-2.1, -.94])
            box(b, 8, .55, z, .83, .08, .26, C.wood);
        toyDuck(b, 8, .7, -1.6, .31);
        for (const z of [-2.7, -.3]) {
            b.add('cylinder', 9.36, .63, z, .12, 1.13, .12, C.wood);
            b.add('sphere', 9.36, 1.2, z, .14, .14, .14, C.cream);
        }
        const bx = 5.1, bz = 3.5;
        for (const x of [bx - .48, bx + .48]) {
            b.add('torus', x, .55, bz, .33, .33, .33, '#627f76', Math.PI / 2);
            b.add('sphere', x, .55, bz, .09, .09, .09, C.cream);
        }
        for (const pts of [[[bx - .48, .55, bz], [bx - .1, 1.02, bz]], [[bx - .1, 1.02, bz], [bx + .48, .55, bz]], [[bx + .48, .55, bz], [bx - .48, .55, bz]], [[bx - .48, .55, bz], [bx + .29, 1.03, bz]], [[bx + .29, 1.03, bz], [bx + .48, .55, bz]]])
            rod(b, pts[0], pts[1], .046, '#e1b499');
        box(b, bx - .12, 1.08, bz, .28, .09, .16, C.wood);
        rod(b, [bx + .29, 1.03, bz], [bx + .29, 1.24, bz], .035, C.ink);
        box(b, bx + .29, 1.25, bz, .29, .038, .04, C.ink);
        planter(b, 2.2, 10, 1.65);
        planter(b, 18.5, -1, 1.4);
        planter(b, 18.8, -2.2, 1.4);
        for (let i = 0; i < 12; i++) {
            const xx = 12.4 + i * .48;
            box(b, xx, .65, 10.8, .07, .94, .07, C.cream);
        }
        for (const y of [.5, .93])
            box(b, 15.04, y, 10.8, 5.7, .055, .055, C.cream);
        nav.obstacles.push({ x: 15.04, z: 10.8, w: 5.7, d: .1 });
    }
}
export function drawRegion(b, id, time) {
    if (id !== 'au' && id !== 'jp' && id !== 'nl') {
        drawThemedRegion(b, id, time);
        return;
    }
    if (id === 'nl') {
        const x = 4.6, y = 4.18, z = 8.35, a = time * .18;
        for (let i = 0; i < 4; i++) {
            const t = a + i * Math.PI / 2, dx = Math.sin(t), dy = Math.cos(t);
            rod(b, [x, y, z], [x + dx * 2.58, y + dy * 2.58, z], .09, C.wood);
            for (let j = 0; j < 6; j++) {
                const r = .78 + j * .3;
                rod(b, [x + dx * r, y + dy * r, z], [x + dx * r + dy * .57, y + dy * r - dx * .57, z], .045, C.cream);
            }
            rod(b, [x + dx * .64 + dy * .57, y + dy * .64 - dx * .57, z], [x + dx * 2.57 + dy * .57, y + dy * 2.57 - dx * .57, z], .045, C.cream);
        }
        b.add('cylinder', x, y, z + .04, .38, .3, .38, C.wood, Math.PI / 2);
    }
}