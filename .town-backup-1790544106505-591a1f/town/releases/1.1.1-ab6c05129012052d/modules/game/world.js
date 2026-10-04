import { buildRegion, drawRegion } from '../travel/region-scenes.js';
import { REGIONS, regionWalkHeight } from '../travel/atlas.js';
import { cottage, gardenTree, hydrangea, contact, GARDEN } from './atelier.js';
import { nearPlay, playStatic, drawPlayyard, parkPlayyard, blossom } from './playyard-scene.js';
import { nearHoney, honeyStatic, drawHoney } from './honey-scene.js';
import { nearScience, scienceStatic, drawScience } from './science-scenes.js';
import { Builder } from './renderer.js';
import { Navigation } from './navigation.js';
import { BASE, buildLandscape, terrainHeight, walkHeight, insideMap, isWater, riverX, riverHalfWidth, trailDistance, mapBoundary } from './landscape.js';
import { seeded, uv, food, hands } from '../experiments/models.js';
export const STATIONS = {
    buoyancy: { center: [-11, 1.85, 16.8], approach: [-11, 19.7], label: [-11, 4.5, 16.8], name: '浮沉船坞' },
    shadow: { center: [1.4, 2, 18.2], approach: [1.4, 21.1], label: [1.4, 4.4, 18.2], name: '光影小剧场' },
    pulley: { center: [13.2, 2.2, 17.3], approach: [13.2, 20.2], label: [13.2, 5, 17.3], name: '绳轮花棚' },
    honey: { center: [-11, 1.8, 10.2], approach: [-7.9, 11.3], label: [-11, 3.9, 10.2], name: '蜜晶小院' },
    optics: { center: [13.7, 1.5, 10.4], approach: [10.7, 11.9], label: [13.7, 3.9, 10.4], name: '光路水庭' },
    balance: { center: [15.5, 1.9, -7.3], approach: [15.5, -4.9], label: [15.5, 4, -7.3], name: '平衡工坊' },
    sound: { center: [16, 1.7, 2.6], approach: [16, 5], label: [16, 4, 2.6], name: '弦音花亭' },
    uv: {
        center: [-9, 1.8, -.8], approach: [-6.7, 2.2], label: [-9, 3.2, 1.8], name: '户外观察花园'
    }, food: {
        center: [8, .6, -1], approach: [5.7, .3], label: [8, 3.1, -1.2], name: '生活厨房与庭院'
    }, hands: {
        center: [8, 1.4, 6], approach: [5.3, 6.8], label: [8, 3.5, 6], name: '清洁工作坊'
    }
};
export const HOUSE = [0, -3.5];
export const handAnchors = [[7.15, 1.7, 6.08], [8.7, 1.7, 6.08], [7.2, 1.7, 5.52], [7.95, 1.7, 6], [8.7, 1.7, 4.96], [9.5, 1.7, 6.7]];
export const probePosition = (i) => [-10.8 + i * 1.8, 1.4, -.8];
export const shadePosition = (i) => i < 0 ? [-12, 3.4, -4] : [-10.8 + i * 1.8, 3.4, -.8];
const C = {
    grass: '#a6cf79', darkGrass: '#82ad64', wood: '#c28d5d', paleWood: '#e7bd80', bark: '#7b5639', cream: '#fff0cc', stone: '#c8c4ae', roof: '#d86f55', roofLight: '#ee9b79', leaf: '#63a56b', leaf2: '#86bd72', leaf3: '#3f8361', water: '#58bdca', metal: '#557f86', blue: '#7fb8c8'
};
function beam(b, a, c, width, col) { const dx = c[0] - a[0], dy = c[1] - a[1], dz = c[2] - a[2], length = Math.hypot(dx, dy, dz); b.add('cylinder', (a[0] + c[0]) / 2, (a[1] + c[1]) / 2, (a[2] + c[2]) / 2, width, length, width, col, Math.acos(dy / length), Math.atan2(dx, dz)); }
export class World {
    region;
    static = new Builder();
    landscape = [];
    grounded = new Set();
    dynamic = new Builder();
    navigation = new Navigation();
    trees = [];
    constructor(region = null) {
        this.region = region;
        if (region) {
            buildRegion(region, this.static, this.navigation);
        }
        else {
            this.landscape = buildLandscape();
            this.build();
        }
    }
    heightAt(x, z) { return this.region ? regionWalkHeight(this.region, x, z) : walkHeight(x, z); }
    box(x, y, z, w, h, d, col, ry = 0, hide = '') { this.static.add('box', x, y, z, w, h, d, col, 0, ry, 0, 0, hide); }
    tree(x, z, size = 1, pine = false) {
        if (nearPlay(x, z) || nearHoney(x, z) || nearScience(x, z) || !insideMap(x, z, .45) || isWater(x, z, .35) || (trailDistance(x, z) < .25 && !(x === -10.8 && z === -1.5)))
            return;
        const b = this.static, first = b.count;
        this.navigation.obstacles.push({
            x, z, w: .5 * size, d: .5, round: true
        });
        this.trees.push([x, z, size]);
        gardenTree(b, x, z, size, pine);
        const lift = terrainHeight(x, z) - BASE;
        for (let i = first; i < b.count; i++) {
            b.items[i].matrix[13] += lift;
            this.grounded.add(b.items[i]);
        }
    }
    fence(x, z, length, ry = 0) {
        const b = this.static;
        for (let i = 0; i <= Math.floor(length / .45); i++) {
            const t = -length / 2 + i * .45, px = x + Math.cos(ry) * t, pz = z - Math.sin(ry) * t;
            b.add('box', px, .65, pz, .16, 1, .14, C.paleWood, 0, ry);
            b.add('roof', px, 1.19, pz, .18, .18, .16, C.paleWood, 0, ry);
        }
        for (const y of [.43, .91])
            b.add('box', x, y, z, length, .11, .12, C.wood, 0, ry);
        this.navigation.obstacles.push({
            x, z, w: Math.abs(Math.cos(ry)) * length + .16, d: Math.abs(Math.sin(ry)) * length + .16
        });
    }
    flowers(x, z, colour, seed) {
        const r = seeded(seed);
        for (let i = 0; i < 10; i++) {
            const px = x + (r() - .5) * 1.5, pz = z + (r() - .5), h = .19 + r() * .2;
            this.static.add('cylinder', px, .16 + h / 2, pz, .035, h, .035, C.leaf3);
            blossom(this.static, px, .16 + h, pz, .24, colour);
        }
    }
    house(x, z, w, d, roof, _wall, hide = '', hideWhole = '') {
        const b = this.static, firstPart = b.count;
        this.navigation.obstacles.push({
            x, z, w, d
        });
        cottage(b, x, z, w, d, roof === '#78988c', hide);
        if (hideWhole)
            for (let i = firstPart; i < b.count; i++) {
                const part = b.items[i];
                part.hide = part.hide ? part.hide + '|' + hideWhole : hideWhole;
            }
    }
    bench(x, z, ry = 0) {
        const b = this.static;
        for (let i = 0; i < 4; i++)
            b.add('box', x, .6, z + (i - 1.5) * .14, 1.9, .12, .12, C.paleWood, 0, ry);
        for (const s of [-1, 1]) {
            b.add('box', x + s * .7, .35, z, .1, .5, .64, C.wood, 0, ry);
            b.add('box', x + s * .7, .95, z - .32, .08, 1.1, .08, C.wood, 0, ry);
        }
        for (const y of [.91, 1.16])
            b.add('box', x, y, z - .3, 1.95, .18, .08, C.paleWood, 0, ry);
        this.navigation.obstacles.push({
            x, z, w: 2, d: .7
        });
    }
    rock(x, z, size = 1) {
        this.static.add('sphere', x, .28 * size, z, .9 * size, .55 * size, .72 * size, '#aaa995', 0, x * .37 + z * .11, 0, 1);
        this.static.add('sphere', x + .22 * size, .45 * size, z - .08 * size, .55 * size, .42 * size, .48 * size, '#bdbba5', 0, z * .2, 0, 1);
    }
    lamp(x, z) {
        const b = this.static;
        b.add('cylinder', x, .85, z, .08, 1.55, .08, '#6e766c');
        b.add('box', x, 1.58, z, .46, .5, .46, '#d9cfa7');
        b.add('roof', x, 1.92, z, .62, .32, .62, '#718071');
        b.add('box', x, .16, z, .42, .16, .42, C.stone);
    }
    crate(x, z, ry = 0) {
        this.box(x, .35, z, .72, .55, .72, '#b98f64', ry);
        for (const d of [-.28, .28])
            this.box(x + Math.cos(ry) * d, .36, z - Math.sin(ry) * d, .07, .58, .76, C.wood, ry);
    }
    gazebo(x, z) {
        const b = this.static;
        b.add('cylinder', x, .26, z, 2.5, .26, 2.5, '#d6cfb6');
        for (let i = 0; i < 6; i++) {
            const a = i * Math.PI / 3, px = x + Math.cos(a) * 1.65, pz = z + Math.sin(a) * 1.65;
            b.add('cylinder', px, 1.55, pz, .12, 2.6, .12, C.paleWood);
        }
        b.add('cone', x, 3.15, z, 4.25, 1.35, 4.25, '#c9876b', 0, .25, 0, 0);
        b.add('cylinder', x, 3.87, z, .18, .35, .18, '#e0c29a');
        for (let i = 0; i < 6; i++) {
            const a = i * Math.PI / 3;
            beam(b, [x + Math.cos(a) * .15, 3.25, z + Math.sin(a) * .15], [x + Math.cos(a) * 1.75, 2.7, z + Math.sin(a) * 1.75], .06, C.wood);
        }
        for (let i = 0; i < 6; i++) {
            const a = i * Math.PI / 3;
            this.navigation.obstacles.push({ x: x + Math.cos(a) * 1.65, z: z + Math.sin(a) * 1.65, w: .16, d: .16, round: true });
        }
    }
    greenhouse(x, z) {
        const b = this.static;
        this.box(x, .28, z, 3.8, .24, 2.7, C.stone);
        for (const sx of [-1, 1])
            for (const zz of [-1.05, 0, 1.05])
                b.add('box', x + sx * 1.75, 1.35, z + zz, .09, 2.1, .09, '#b6c7b8');
        for (const zz of [-1.25, 1.25])
            for (const xx of [-1.65, 0, 1.65])
                b.add('box', x + xx, 1.35, z + zz, .09, 2.1, .09, '#b6c7b8');
        beam(b, [x, 3.06, z - 1.35], [x, 3.06, z + 1.35], .085, '#d4dbc9');
        for (const row of [-.72, .72]) {
            this.box(x, .55, z + row, 2.7, .45, .55, C.wood);
            for (let i = 0; i < 5; i++)
                b.add('sphere', x - 1.05 + i * .52, .91, z + row, .38, .34, .38, i % 2 ? C.leaf2 : C.leaf);
        }
        this.box(x, 1.15, z + 1.39, .8, 1.65, .08, '#d8e2d7');
        this.navigation.obstacles.push({ x, z, w: 3.9, d: 2.8 });
    }
    picnic(x, z, ry = 0) {
        this.box(x, .75, z, 2.1, .14, 1.05, C.paleWood, ry);
        for (const side of [-1, 1]) {
            this.box(x + Math.cos(ry + Math.PI / 2) * side * .8, .48, z - Math.sin(ry + Math.PI / 2) * side * .8, 1.9, .12, .34, C.wood, ry);
        }
        for (const dx of [-.72, .72])
            for (const dz of [-.34, .34])
                this.box(x + Math.cos(ry) * dx + Math.sin(ry) * dz, .38, z - Math.sin(ry) * dx + Math.cos(ry) * dz, .1, .65, .1, C.wood, ry);
        this.navigation.obstacles.push({ x, z, w: 2.4, d: 2.1 });
    }
    marketStall(x, z, ry = 0) {
        const b = this.static;
        this.box(x, .66, z, 1.8, .16, .8, C.paleWood, ry);
        for (const sx of [-.72, .72])
            this.box(x + Math.cos(ry) * sx, 1.45, z - Math.sin(ry) * sx, .09, 1.7, .09, C.wood, ry);
        for (let i = 0; i < 5; i++)
            this.box(x, 2.15, z + (i - 2) * .16, 1.95, .08, .15, i % 2 ? '#e8d4b5' : '#b7c8b1', ry);
        for (let i = 0; i < 6; i++)
            b.add('sphere', x - .55 + (i % 3) * .5, .88, z - .15 + Math.floor(i / 3) * .3, .22, .16, .2, i % 2 ? '#c88968' : '#d6b56f');
        this.navigation.obstacles.push({ x, z, w: 2, d: 1 });
    }
    pondDeck(x, z) {
        const b = this.static, first = b.count;
        for (let i = 0; i < 9; i++) {
            const a = i * .72;
            b.add('cylinder', x + Math.cos(a) * 1.45, .25, z + Math.sin(a) * .95, .38, .035, .28, '#78996e');
        }
        for (let i = 0; i < 7; i++)
            this.box(x - 2.25 + i * .42, .34, z + 1.2, .38, .12, 1.0, i % 2 ? C.paleWood : '#c7a77e', .08);
        for (const xx of [x - 2.45, x + .45])
            this.box(xx, .72, z + 1.62, .09, .85, .09, C.wood);
        beam(b, [x - 2.45, 1.02, z + 1.62], [x + .45, 1.02, z + 1.62], .07, C.paleWood);
        for (let i = first; i < b.count; i++)
            this.grounded.add(b.items[i]);
    }
    cottageInterior(x, z) {
        const b = this.static;
        // Visible through the front glazing/door: rug, table, shelves, books and a warm stove.
        this.box(x, .25, z + 1.05, 2.2, .04, 1.15, '#d8b89a');
        b.add('cylinder', x + .7, .62, z + .65, .62, .12, .62, C.paleWood);
        for (const a of [0, Math.PI / 2, Math.PI, Math.PI * 1.5]) {
            const cx = x + .7 + Math.cos(a) * .72, cz = z + .65 + Math.sin(a) * .72;
            this.box(cx, .43, cz, .42, .08, .42, C.wood, a);
        }
        this.box(x - 1.45, 1.15, z + .25, .3, 1.65, 1.7, C.wood);
        for (const yy of [.55, 1.05, 1.55])
            this.box(x - 1.3, yy, z + .25, .72, .08, 1.55, C.paleWood);
        for (let i = 0; i < 9; i++)
            this.box(x - 1.15, .65 + (i % 3) * .5, z - .3 + Math.floor(i / 3) * .48, .18, .32, .1, ['#9eb4ad', '#d2aa87', '#d8c69c'][i % 3]);
        this.box(x - .55, .72, z - .55, .65, 1.0, .6, '#718078');
        b.add('cylinder', x - .55, 1.75, z - .55, .13, 1.1, .13, '#65716b');
    }
    timberBridge(z) {
        const b = this.static, x = riverX(z), first = b.count;
        // Slightly crowned timber footbridge with visible stringers, posts and handrails.
        for (let i = 0; i < 13; i++) {
            const dx = (i - 6) * .22, y = .31 + .11 * (1 - Math.abs(i - 6) / 6);
            b.add('box', x + dx, y, z, .2, .13, 1.82, i % 2 ? C.paleWood : '#c49f72');
        }
        for (const side of [-1, 1]) {
            const zz = z + side * .88;
            beam(b, [x - 1.38, .55, zz], [x + 1.38, .55, zz], .075, C.wood);
            beam(b, [x - 1.28, 1.08, zz], [x + 1.28, 1.08, zz], .065, C.paleWood);
            for (const xx of [x - 1.25, x - .62, x, x + .62, x + 1.25])
                this.box(xx, .78, zz, .1, .92, .1, C.wood);
        }
        for (let i = first; i < b.count; i++)
            this.grounded.add(b.items[i]);
    }
    stoneBridge(z) {
        const b = this.static, x = riverX(z), first = b.count;
        // A visually distinct old stone crossing: broad slab, parapets, piers and dark arch reveals.
        for (let i = 0; i < 11; i++) {
            const dx = (i - 5) * .27, y = .38 + .14 * (1 - Math.abs(i - 5) / 5);
            this.box(x + dx, y, z, .29, .18, 1.72, i % 3 === 0 ? '#b8b6a2' : '#cbc7af');
        }
        for (const side of [-1, 1]) {
            const zz = z + side * .82;
            for (let i = 0; i < 8; i++)
                this.box(x - 1.18 + i * .34, .78, zz, .31, .42, .18, i % 2 ? '#b3b19c' : '#c8c4ac');
            this.box(x, 1.03, zz, 2.7, .18, .22, '#d6d1b8');
        }
        for (const xx of [x - 1.08, x + 1.08])
            this.box(xx, .28, z, .38, .55, 1.95, '#aaa994');
        b.add('ring', x, .36, z - .91, 1.2, .72, 1.2, '#777c73', Math.PI / 2);
        b.add('ring', x, .36, z + .91, 1.2, .72, 1.2, '#777c73', Math.PI / 2);
        for (let i = first; i < b.count; i++)
            this.grounded.add(b.items[i]);
    }
    architecturePass() {
        const b = this.static;
        // Cottage porch garden: clear centre route, paired borders inside the building footprint.
        for (const side of [-1, 1]) {
            const xx = .1 + side * 1.8;
            b.add('bevel', xx, .33, -4.28, .67, .27, .55, GARDEN.woodLight, 0, 0, 0, 3);
            hydrangea(b, xx, .43, -4.29, .73, side < 0);
        }
        // Kitchen: conservatory dining nook, deep porch, flue, hanging herbs and exterior prep bench.
        this.box(9.72, 1.15, -6.05, 1.35, 1.55, 2.15, '#dce7d9');
        for (const z of [-6.7, -6.05, -5.4])
            this.box(10.42, 1.45, z, .06, 1.15, .48, '#9ebfbd');
        b.add('roof', 9.72, 2.35, -6.05, 1.65, .72, 2.45, '#b9d0c8');
        this.box(8, .48, -4.18, 3.2, .18, 1.0, C.paleWood);
        for (const x of [6.7, 9.3])
            this.box(x, 1.28, -4.2, .11, 1.7, .11, C.wood);
        beam(b, [6.65, 2.05, -4.2], [9.35, 2.05, -4.2], .09, C.wood);
        this.box(7.05, 1.05, -7.25, .55, 2.2, .55, '#b79c83');
        this.box(7.05, 2.22, -7.25, .72, .15, .72, '#dfcbb0');
        this.box(10.35, .72, -4.62, 1.55, .16, .62, C.wood);
        for (const x of [9.72, 10.98])
            this.box(x, .42, -4.62, .09, .62, .09, C.wood);
        for (let i = 0; i < 5; i++) {
            b.add('cylinder', 9.85 + i * .24, 1.03, -4.6, .1, .22, .1, '#c8a36f');
            b.add('sphere', 9.85 + i * .24, 1.18, -4.6, .15, .14, .15, C.leaf2);
        }
        // Workshop: service annex, clerestory glazing, water tank, towel rail and sheltered wash bay.
        this.box(10.0, 1.18, 2.62, 1.55, 1.7, 1.95, '#d6dfc8');
        b.add('roof', 10.0, 2.48, 2.62, 1.85, .7, 2.25, '#78988c');
        for (const x of [9.55, 10.0, 10.45])
            this.box(x, 1.65, 1.61, .32, .62, .06, '#a4c5c4');
        this.box(8, .42, 4.02, 3.25, .16, .9, C.paleWood);
        for (const x of [6.68, 9.32])
            this.box(x, 1.22, 4.0, .1, 1.65, .1, C.wood);
        beam(b, [6.65, 2.02, 4.0], [9.35, 2.02, 4.0], .08, C.wood);
        b.add('cylinder', 11.15, 1.05, 3.15, 1.15, 1.8, 1.15, '#91aaa6');
        b.add('cylinder', 11.15, 2.0, 3.15, 1.22, .12, 1.22, '#d8dfd2');
        for (let i = 0; i < 5; i++)
            b.add('ring', 11.15, .55 + i * .3, 3.15, .62, .62, .62, '#78918e', Math.PI / 2);
        beam(b, [9.4, 1.55, 4.45], [10.7, 1.55, 4.45], .05, C.metal);
        for (let i = 0; i < 4; i++)
            this.box(9.55 + i * .34, 1.25, 4.44, .27, .48, .04, i % 2 ? '#c6d5cc' : '#e4cfb4');
        // Greenhouse gains a potting shed and rain barrel so it reads as a working place, not a glass box.
        this.box(-12.45, .9, -6.05, 1.05, 1.35, 1.45, '#d9c7a8');
        b.add('roof', -12.45, 1.92, -6.05, 1.35, .65, 1.75, '#9a8066');
        this.box(-12.45, .9, -5.29, .52, 1.1, .08, '#7f9a83');
        b.add('cylinder', -11.7, .62, -5.1, .72, 1.05, .72, '#829b96');
        b.add('cylinder', -11.7, 1.17, -5.1, .78, .08, .78, '#c5d1c6');
        // Landmark details: signposts and layered planters make the crossroads legible at a glance.
        for (const [x, z, ry] of [[-4.8, -1.2, .2], [3.8, -1.1, -.15], [3.9, 5.0, .1]]) {
            this.box(x, .9, z, .09, 1.55, .09, C.wood);
            this.box(x, 1.45, z, .92, .34, .09, C.cream, ry);
            b.add('roof', x, 1.76, z, 1.02, .2, .22, C.roof, 0, ry);
        }
        for (const [x, z] of [[-3.1, -3.1], [2.9, -3.0], [-3.1, 2.7], [3.0, 2.8]]) {
            this.box(x, .28, z, 1.35, .34, .62, C.wood);
            for (let i = 0; i < 5; i++)
                b.add('sphere', x - .48 + i * .24, .56, z, .3, .3, .28, i % 2 ? C.leaf2 : C.leaf);
        }
    }
    landscapePass() {
        const b = this.static;
        // Three depth bands: tall ridge trees, smaller edge trees, low foreground understorey.
        for (const [x, z, size] of [[-15, -9, .86], [-13, -10.4, .98], [-9.1, -10.8, .9], [-6.4, -11.2, 1.08], [-4.9, -10.2, .82], [-1.5, -10.7, .88], [7.7, -11.1, .8], [14.9, -7.5, .8], [15.6, -4.6, .85], [15.6, 1, .78], [-15.7, 4.6, .87], [-14.5, 7.1, .88]])
            this.tree(x, z, size, true);
        for (const [x, z] of [[-14.8, -7.8], [-12.2, -10.2], [-7.4, -10.1], [-5.2, -8.9], [13.9, -9.8], [15.1, 5.7], [-14.6, 8.2], [-10.9, 10.1], [11.9, 10.3]]) {
            for (let i = 0; i < 3; i++)
                b.add('sphere', x + Math.sin(i * 2) * .43, .39 + i * .06, z + Math.cos(i * 2) * .4, .85, .57, .72, i % 2 ? C.leaf2 : C.leaf3);
            this.rock(x + .6, z - .3, .45);
        }
        // A ridge lookout, not a raised slab on the old flat floor. Posts and deck share an anchor.
        const first = b.count, x = -6.65, z = -8.3, ground = terrainHeight(x, z);
        for (let i = 0; i < 8; i++)
            this.box(x - 1.02 + i * .29, .22, z, .265, .09, 1.65, i % 2 ? C.paleWood : '#bd9f78');
        for (const dx of [-1.1, 1.1])
            for (const dz of [-.77, .77])
                this.box(x + dx, .45, z + dz, .09, .82, .09, C.wood);
        beam(b, [x - 1.1, .84, z - .77], [x + 1.1, .84, z - .77], .07, C.paleWood);
        for (let i = first; i < b.count; i++) {
            b.items[i].matrix[13] += ground - BASE;
            this.grounded.add(b.items[i]);
        }
        // Solid built extensions now block walking too; decorative flowers remain traversable.
        this.navigation.obstacles.push({ x: 10.0, z: 2.6, w: 1.6, d: 2 }, { x: 11.15, z: 3.15, w: 1.25, d: 1.25, round: true }, { x: 9.9, z: -6.05, w: 1.5, d: 2.3 }, { x: -12.45, z: -6.05, w: 1.1, d: 1.5 }, { x: -6.65, z: -8.7, w: .65, d: .65, round: true });
        // Sparse path-edge stones, deliberately clear of passageways.
        for (let i = 0; i < 9; i++) {
            const z = -5.0 - i * .42, x = -5.35 - .25 * Math.sin(i * .55);
            b.add('sphere', x, .25, z, .32, .22, .28, C.stone, 0, i);
        }
        // Both creek banks use the exact water width, including the broader southern pool.
        for (let i = 0; i < 40; i++) {
            const z = -11.1 + i * .57, x = riverX(z) + (i % 2 ? 1 : -1) * (riverHalfWidth(z) + .3);
            if (Math.abs(z - 1) < 1 || Math.abs(z - 7) < 1)
                continue;
            b.add('sphere', x, .22, z, .31, .22, .38, i % 3 ? C.stone : '#a7ad8c', 0, i * .31);
        }
    }
    build() {
        const b = this.static;
        // Ground, paths and water are now continuous meshes from landscape.ts.
        const r = seeded(20260221);
        for (let i = 0; i < 48; i++) {
            const z = r() * 21 - 10.5;
            if (Math.abs(z - 1) < 1.2 || Math.abs(z - 7) < 1.2)
                continue;
            const side = i % 2 ? 1 : -1;
            b.add('sphere', riverX(z) + side * (1.1 + r() * .25), .3, z, .3 + r() * .45, .24 + r() * .2, .34 + r() * .3, C.stone, 0, r() * 3);
        }
        this.timberBridge(1);
        this.stoneBridge(7);
        this.house(.1, -6.35, 4.8, 3.5, C.roof, C.cream);
        this.house(8, -6.1, 3.7, 3.2, '#bb7b65', '#e8d4b0', 'food');
        this.house(8, 2.5, 3.7, 2.5, '#78988c', '#e1e7ce', 'hands', 'food');
        // Kitchen striped canopy and outdoor workbench.
        for (let i = 0; i < 7; i++)
            b.add('bevel', 6.6 + i * .45, 2.52, -3.99, .45, .08, 1.2, i % 2 ? '#fff0d0' : '#8bbaaa', .14, 0, 0, 4);
        for (let i = 0; i < 7; i++)
            b.add('soft', 6.6 + i * .45, 2.36, -3.4, .45, .24, .10, i % 2 ? '#fff0d0' : '#8bbaaa', 0, 0, 0, 4);
        for (const x of [6.35, 9.55])
            this.box(x, 1.38, -3.38, .1, 2.5, .1, C.wood);
        this.box(6.8, .96, -2.4, 2.6, .16, 1.02, C.paleWood);
        for (const x of [5.7, 7.9])
            for (const z of [-2.8, -2.05])
                this.box(x, .56, z, .12, .78, .12, C.wood);
        this.navigation.obstacles.push({
            x: 6.8, z: -2.4, w: 2.6, d: 1.05
        });
        for (let i = 0; i < 3; i++)
            b.add('sphere', 6.25 + i * .4, 1.16, -2.45, .45, .28, .34, '#d5aa79');
        b.add('cylinder', 7.55, 1.29, -2.4, .35, .5, .35, '#d5ddd1');
        // Workshop basin, pedestal, faucet and towel rail.
        this.box(8, 1.16, 5.8, 4.5, .26, 2.6, C.cream);
        this.box(8, .54, 5.8, 3.9, 1.05, 2.12, '#a6c0b1');
        this.navigation.obstacles.push({
            x: 8, z: 5.8, w: 4.5, d: 2.6
        });
        this.box(8, 1.32, 5.8, 4.14, .13, 2.3, '#e0e8dc');
        this.box(8, 1.4, 4.51, 4.4, .21, .18, C.cream);
        this.box(8, 1.4, 7.05, 4.4, .21, .18, C.cream);
        for (const x of [5.85, 10.15])
            this.box(x, 1.4, 5.8, .18, .21, 2.6, C.cream);
        beam(b, [8, 1.4, 4.55], [8, 2.3, 4.55], .12, C.metal);
        beam(b, [8, 2.3, 4.55], [8, 2.3, 5.05], .13, C.metal);
        beam(b, [8, 2.3, 5.05], [8, 2.08, 5.05], .13, C.metal);
        b.add('box', 8, 1.77, 4.6, .5, .07, .08, C.metal);
        this.box(9.5, .8, 7.2, 1.1, .07, .08, C.wood);
        this.box(9.5, .62, 7.22, .6, .55, .06, '#e5d7b7');
        // Garden edged beds, trellis, sundial and watering can.
        this.box(-9, .22, -.8, 6.5, .15, 3.4, '#b9bb92');
        for (const z of [-2.55, .95])
            this.box(-9, .31, z, 6.7, .2, .13, C.paleWood);
        for (const x of [-12.3, -5.7])
            this.box(x, .31, -.8, .13, .2, 3.4, C.paleWood);
        this.fence(-10, -3.3, 5.9);
        this.fence(-13.4, -.7, 4.6, Math.PI / 2);
        this.fence(-10.7, 3.7, 3.6);
        this.bench(-11.2, 5.4);
        this.bench(1.45, 6.5);
        b.add('cylinder', -6, 1.1, -2.8, .4, 1.8, .4, C.stone);
        b.add('cylinder', -6, 2, -2.8, 1, .1, 1, C.cream);
        b.add('roof', -6, 2.22, -2.8, .15, .4, .5, C.metal);
        b.add('cylinder', -12.3, .56, 1.8, .65, .65, .65, '#90abb0');
        beam(b, [-12.1, .6, 1.8], [-11.5, .95, 1.8], .16, '#90abb0');
        b.add('ring', -12.5, .9, 1.8, .38, .38, .38, '#789397', Math.PI / 2);
        this.flowers(-11.4, -2.3, '#e5c695', 1);
        this.flowers(-7, -2.35, '#d9b3ac', 2);
        this.flowers(-11.7, 2.7, '#eeead3', 3);
        this.flowers(2.7, -4.4, '#e3b4a0', 4);
        this.flowers(10.6, -2.7, '#e8d28e', 5);
        this.flowers(10.9, 7.8, '#e6bbb2', 6);
        this.flowers(.5, 8.3, '#e4e6ce', 7);
        for (const [x, z, s, pine] of [[-14, -8, 1.1, 1], [-11.2, -8.6, 1.2, 1], [-7.6, -8.9, .9, 0], [-13.8, -4.8, 1, 0], [-14.2, 2.8, 1.1, 1], [-13.5, 7.7, 1.15, 0], [-9.8, 9, 1.15, 1], [-6.7, 9.2, .95, 0], [.2, -10, .95, 1], [4, -9.9, 1.1, 0], [11.7, -8.9, 1.1, 1], [14, -6.6, 1.1, 0], [13.5, -2, .9, 1], [13.7, 2, .85, 0], [13.4, 7.4, 1.1, 1], [10.3, 9.1, .85, 0], [6.5, 9.5, .82, 1], [1.6, 9.7, .82, 0], [-10.8, -1.5, .82, 0]])
            this.tree(x, z, s, Boolean(pine));
        for (let i = 0; i < 21; i++) {
            const x = (r() - .5) * 28, z = i % 2 ? 9.7 : -9.9;
            if (Math.abs(x - riverX(z)) < 1.8)
                continue;
            b.add('sphere', x, .45, z, 1.25, .8, 1.05, i % 2 ? C.leaf2 : C.leaf);
        }
        for (const [x, z] of [[2.8, 1.3], [-6.2, 2.2], [4.7, 6.7]]) {
            b.add('cylinder', x, 1.06, z, .1, 1.9, .1, C.wood);
            b.add('box', x, 1.88, z, .9, .4, .12, C.cream);
            b.add('roof', x, 2.14, z, 1.02, .22, .32, C.roof);
        }
        // Layered landmarks and lived-in details make each walk between experiments feel authored.
        for (const [x, z] of [[-3.2, -1.3], [2.8, -.4], [2.5, 5.8], [-4.8, 6.8], [-7.1, 4.8]])
            this.lamp(x, z);
        for (const [x, z, s] of [[-5.1, -7.9, .8], [-3.9, -8.3, .55], [3.1, -7.7, .65], [11.9, 4.6, .8], [-11.9, 6.9, .7], [12.2, 8.4, .55]])
            this.rock(x, z, s);
        // Cottage porch: chairs, planter boxes, stacked firewood and a tiny mail box.
        this.box(-1.25, .58, -4.25, .75, .1, .75, C.paleWood);
        this.box(-1.25, 1.05, -4.55, .75, .75, .1, C.paleWood);
        for (const x of [-1.55, -.95])
            this.box(x, .32, -4.25, .08, .5, .65, C.wood);
        this.box(1.55, .38, -4.2, 1.25, .5, .55, C.wood);
        for (let i = 0; i < 5; i++)
            b.add('cylinder', 1.1 + i * .23, .72, -4.15, .11, .75, .11, '#8c6849', Math.PI / 2, 0);
        this.box(-2.95, .95, -5.15, .52, .55, .52, '#8ba09a');
        this.box(-2.95, .46, -5.15, .1, .8, .1, C.wood);
        this.box(-2.95, .26, -5.15, .62, .12, .62, C.stone);
        // Kitchen courtyard: herb planters, produce crates, stools, crockery and a washing line.
        for (const z of [-1.1, .0]) {
            this.box(10.65, .36, z, 1.5, .5, .65, C.wood);
            this.box(10.65, .64, z, 1.3, .12, .5, '#738e68');
        }
        this.crate(10.7, -3.4, .12);
        this.crate(11.45, -3.55, -.08);
        for (const x of [8.6, 9.45]) {
            b.add('cylinder', x, .55, -2.35, .38, .7, .38, C.paleWood);
            b.add('cylinder', x, .92, -2.35, .52, .12, .52, C.wood);
        }
        b.add('cylinder', 6.0, 1.2, -2.4, .18, .12, .18, '#efe5cd');
        b.add('cylinder', 6.45, 1.2, -2.4, .16, .15, .16, '#a9c1bd');
        for (const x of [10.4, 12.5])
            this.box(x, 1.45, -5.0, .1, 2.7, .1, C.wood);
        beam(b, [10.4, 2.55, -5], [12.5, 2.55, -5], .035, '#ded5bd');
        for (let i = 0; i < 4; i++)
            this.box(10.75 + i * .45, 2.2, -5, .34, .48, .035, i % 2 ? '#d9b2a0' : '#e8d7b4');
        // Workshop: shelving, folded towels, bottles and potted plants create a recognisable cleaning space.
        this.box(11.2, 1.55, 4.2, 2.2, .12, .55, C.wood);
        for (const x of [10.2, 12.2])
            this.box(x, .95, 4.2, .1, 1.2, .5, C.wood);
        for (let i = 0; i < 4; i++) {
            b.add('cylinder', 10.5 + i * .48, 1.82, 4.2, .14, .42, .14, i % 2 ? '#9bb8ae' : '#d7c39f');
            b.add('sphere', 10.5 + i * .48, 2.05, 4.2, .16, .1, .16, '#ece7d5');
        }
        for (let i = 0; i < 3; i++)
            this.box(6.25 + i * .5, 1.62, 4.35, .42, .12, .5, i % 2 ? '#d5c7ad' : '#b8cbc2');
        // Garden: stepping stones, bird bath, trellis vines, tool rack and vegetable rows.
        for (let i = 0; i < 7; i++)
            b.add('cylinder', -12.2 + i * .65, .19, .25 + Math.sin(i) * .16, .42, .08, .34, '#d5d0ba', 0, i * .3);
        b.add('cylinder', -5.7, .65, 2.45, .55, .18, .55, C.stone);
        b.add('cylinder', -5.7, .38, 2.45, .16, .65, .16, C.stone);
        b.add('cylinder', -5.7, .78, 2.45, .75, .13, .75, '#b9c9bb');
        for (const x of [-8.1, -7.5, -6.9])
            for (let i = 0; i < 5; i++) {
                const z = 2.0 + i * .35;
                b.add('sphere', x, .32, z, .32, .22, .3, i % 2 ? '#77956b' : '#8baa75');
            }
        for (const x of [-11.7, -10.7]) {
            this.box(x, 1.55, 2.8, .1, 2.5, .1, C.wood);
        }
        beam(b, [-11.7, 2.7, 2.8], [-10.7, 2.7, 2.8], .08, C.wood);
        for (let i = 0; i < 5; i++)
            b.add('sphere', -11.55 + i * .22, 1.5 + i * .17, 2.78, .3, .3, .25, C.leaf2);
        // Creek-side micro-landmarks: stepping stones, driftwood, fern shelves and a tiny inlet.
        for (const [z, side] of [[-7.4, 1], [-5.8, -1], [3.7, 1], [5.0, -1], [8.6, 1]]) {
            const x = riverX(z) + side * 1.55;
            this.rock(x, z, .55);
            for (let j = 0; j < 3; j++)
                b.add('sphere', x + side * (.25 + j * .18), .34 + j * .03, z - .3 + j * .27, .34, .25, .3, j % 2 ? C.leaf3 : C.leaf2);
        }
        for (let i = 0; i < 5; i++) {
            const z = -1.4 + i * .34, x = riverX(z);
            b.add('cylinder', x - .55 + i * .27, .24, z, .34, .09, .3, '#c5c1aa', 0, i * .3);
        }
        beam(b, [riverX(4.2) - 1.4, .3, 4.0], [riverX(4.2) - .45, .36, 4.45], .09, '#8b7458');
        // River banks gain reeds and small clusters rather than a bare geometric edge.
        for (let i = 0; i < 34; i++) {
            const z = -9.5 + i * .58, x = riverX(z) + (i % 2 ? 1 : -1) * 1.35;
            const h = .35 + (i % 4) * .08;
            b.add('cylinder', x, h / 2 + .18, z, .025, h, .025, '#708d68');
            if (i % 3 === 0)
                b.add('sphere', x, h + .18, z, .1, .18, .1, '#9b8060');
        }
        // v0.3 authored landscape pass: height, destinations and environmental storytelling.
        // Raised woodland shelves visually frame the playable bowl without blocking its paths.
        for (const [x, z, s] of [[-13.8, -7.8, .72], [-12.4, -7.3, .64], [-10.9, -8.1, .58], [10.6, 8.5, .65], [12.1, 8.0, .72], [13.2, 8.7, .58], [-12.4, 8.7, .65], [-10.8, 8.3, .55]])
            this.tree(x, z, s, true);
        // A small civic garden landmark gives the north-west loop a destination of its own.
        this.gazebo(-4.8, 8.6);
        this.flowers(-6.4, 8.0, '#e7c7bd', 81);
        this.flowers(-3.2, 8.0, '#e8dda9', 82);
        // Working greenhouse beside the observation garden: transparent-looking structure, beds and crops.
        this.greenhouse(-10.1, -6.0);
        this.box(-7.75, .35, -6.25, .9, .5, .7, C.wood);
        this.box(-7.75, .65, -6.25, .7, .12, .5, '#7f9d72');
        // Orchard and picnic nook make the eastern residential side feel lived in rather than decorative.
        for (const [x, z] of [[11.0, 1.0], [12.1, .2], [11.8, 2.1]]) {
            this.tree(x, z, .58, false);
            for (let i = 0; i < 5; i++)
                b.add('sphere', x + Math.sin(i * 2) * .45, 2.0 + Math.cos(i) * .22, z + Math.cos(i * 2) * .42, .14, .14, .14, '#c98769');
        }
        this.picnic(2.0, 8.3, .15);
        b.add('cylinder', 2.0, 1.25, 8.3, .09, 1.0, .09, C.wood);
        b.add('cone', 2.0, 2.35, 8.3, 2.6, 1.35, 2.6, '#e4c99e');
        // River storytelling: a shallow source cascade and a broader lily pool, still outside walkable crossings.
        for (let i = 0; i < 5; i++)
            this.rock(riverX(-11.3) + (i % 2 ? 1.5 : -1.5), -10.7 - i * .28, .55);
        const px = riverX(9.25);
        for (const [dx, dz] of [[-.7, -.3], [.4, .25], [.9, -.45], [-.2, .65]]) {
            b.add('cylinder', px + dx, .24, 9.25 + dz, .42, .035, .34, '#799a70');
            b.add('sphere', px + dx + .08, .31, 9.25 + dz, .12, .09, .12, '#e6c4c2');
        }
        // Small story props: bicycle, wheelbarrow and garden tools reward closer inspection.
        for (const x of [-.28, .28])
            b.add('ring', 3.45 + x, .52, -4.8, .48, .48, .48, '#65736e', Math.PI / 2);
        beam(b, [3.17, .52, -4.8], [3.45, .92, -4.8], .055, '#8b765e');
        beam(b, [3.73, .52, -4.8], [3.45, .92, -4.8], .055, '#8b765e');
        beam(b, [3.45, .92, -4.8], [3.8, 1.15, -4.8], .055, '#8b765e');
        this.box(-12.35, .62, -3.6, 1.15, .3, .7, '#9a8063', -.2);
        b.add('ring', -12.75, .47, -3.65, .5, .5, .5, '#66736d', Math.PI / 2);
        beam(b, [-11.9, .72, -3.6], [-11.45, 1.25, -3.6], .06, C.wood);
        for (let i = 0; i < 4; i++)
            beam(b, [-7.1 + i * .22, .3, -3.0], [-7.0 + i * .22, 1.35, -3.0], .035, i % 2 ? '#8a795e' : '#708271');
        // v0.4 composition pass: turn the rectangular field into a layered miniature valley.
        // Terraced edges mask the board-like perimeter and create foreground/midground/background depth.
        for (const [x, z, s] of [[-15, 3.4, .75], [-14.7, 5.8, .9], [-14.8, 8.1, .7], [14.7, -3.2, .75], [14.8, -.4, .88], [14.6, 2.5, .7], [-5.6, -10.2, .65], [-2.7, -10.1, .8], [4.1, 10.1, .72], [7.2, 10, .85]])
            this.tree(x, z, s, true);
        // Stone steps and retaining edges make the north loop read as a raised garden rather than flat scenery.
        for (let i = 0; i < 10; i++)
            b.add('sphere', -8.8 + i * .58, .28, 6.15 + Math.sin(i * .8) * .18, .34, .2, .3, '#b6b49b');
        // A tiny produce stall links the kitchen theme to everyday town life without becoming an economy system.
        this.marketStall(11.0, -6.7, .08);
        this.box(10.95, .22, -7.85, 2.6, .06, .9, '#c8c2a9', .08);
        // Rework the north-east water feature into a composed pond destination with a viewing deck.
        this.pondDeck(6.0, 9.0);
        // Discovery cottage now has readable interior life instead of being an opaque shell.
        this.cottageInterior(.1, -6.35);
        // Layered hedges and low walls guide sightlines around the central crossroads.
        for (let i = 0; i < 8; i++) {
            b.add('sphere', -3.8 + i * .48, .52, 3.75, .55, .55, .5, i % 2 ? C.leaf : C.leaf2);
        }
        for (let i = 0; i < 7; i++) {
            b.add('sphere', 1.2 + i * .5, .5, -1.75, .58, .52, .48, i % 2 ? C.leaf2 : C.leaf);
        }
        // Dense but authored understorey at corners: three scales instead of one repeated tree silhouette.
        for (const [x, z, seed] of [[-13, 9, 301], [12, -9, 302], [-13, -9, 303], [13, 8.8, 304]]) {
            const rr = seeded(seed);
            for (let i = 0; i < 8; i++) {
                const a = rr() * Math.PI * 2, rad = .6 + rr() * 1.7, px = x + Math.cos(a) * rad, pz = z + Math.sin(a) * rad;
                b.add('sphere', px, .3 + rr() * .25, pz, .45 + rr() * .45, .4 + rr() * .3, .45 + rr() * .4, i % 3 === 0 ? C.leaf3 : C.leaf2);
            }
        }
        // Small narrative clusters around paths: parcels, watering pots and bird houses reward slow exploration.
        this.crate(-1.8, -7.8, .15);
        this.crate(-1.05, -7.95, -.1);
        for (const [x, z] of [[-5.4, 4.7], [3.4, 4.9], [10.8, 3.3]]) {
            b.add('cylinder', x, .85, z, .07, 1.45, .07, C.wood);
            this.box(x, 1.55, z, .42, .48, .38, '#d8c29c');
            b.add('roof', x, 1.88, z, .55, .3, .55, C.roof);
            b.add('sphere', x, 1.56, z + .21, .08, .08, .04, '#65736d');
        }
        for (const [x, z] of [[-8.8, 4.3], [-4.0, -5.2], [9.8, 8.0]]) {
            b.add('cylinder', x, .32, z, .42, .42, .42, '#8ea8a4');
            beam(b, [x + .25, .4, z], [x + .7, .7, z], .11, '#8ea8a4');
            b.add('ring', x - .25, .58, z, .24, .24, .24, '#718b89', Math.PI / 2);
        }
        // Noticeboard outside the discovery cottage.
        this.box(-2.4, 1.3, -3.4, 1.2, 1.35, .13, C.wood);
        this.box(-2.4, 1.35, -3.29, 1.02, 1.08, .05, C.cream);
        for (const x of [-2.86, -1.94])
            this.box(x, .65, -3.4, .11, 1.2, .12, C.wood);
        this.box(-2.58, 1.55, -3.24, .32, .3, .02, '#b6c8bb');
        this.box(-2.21, 1.18, -3.24, .3, .4, .02, '#d8b8a0');
        this.architecturePass();
        this.landscapePass();
        // Southern garden is composed around paths and sightlines, never scattered into apparatus clearances.
        for (const [x, z, size, pine] of [[-15.3, 14.2, 1, 0], [-15.5, 18.2, .78, 0], [-14.3, 21.6, .72, 1], [-7, 21.8, .74, 0], [-7.4, 13.1, .62, 1], [5.5, 16.2, .78, 0], [7.6, 19.3, .65, 1], [18.7, 15, .82, 1], [17.6, 21.2, .7, 0], [9.5, 23.1, .62, 1]])
            this.tree(x, z, size, !!pine);
        for (const [x, z, col, seed] of [[-14.7, 20.4, '#e5bab0', 171], [-6.6, 18.8, '#efe2ab', 172], [5.5, 20.2, '#dfb2aa', 173], [9.5, 14.4, '#ece2bb', 174], [16.7, 20.3, '#ddbbb8', 175]])
            this.flowers(x, z, col, seed);
        for (const [x, z] of [[-8.6, 13.2], [5.6, 14.4], [8.2, 22.5], [16.5, 13.6]]) {
            this.box(x, .28, z, .86, .23, .65, C.paleWood);
            this.box(x, .41, z, .70, .09, .5, C.bark);
            for (let i = 0; i < 3; i++)
                blossom(b, x + (i - 1) * .23, .76, z, .26, i % 2 ? '#efdca2' : '#e7b8a7');
            for (const side of [-1, 1])
                this.box(x + side * .44, .35, z, .065, .34, .64, C.wood);
        }
        // Garden name boards: relief icons, wooden feet, pegs and a small book return box.
        for (const [x, z] of [[-8, 15], [5.9, 18.8], [10.8, 14.2]]) {
            this.box(x, .85, z, .10, 1.4, .10, C.wood);
            this.box(x, 1.43, z, .95, .57, .09, C.cream);
            b.add('roof', x, 1.80, z, 1.13, .19, .3, C.roof);
            b.add('ring', x, 1.46, z + .06, .13, .13, .13, C.metal, Math.PI / 2);
            for (const side of [-1, 1])
                b.add('sphere', x + side * .37, 1.44, z + .08, .045, .045, .04, C.wood);
        }
        // All scenery is grounded on the same height field sampled by the avatar and ray picking.
        for (let i = 0; i < b.count; i++) {
            const item = b.items[i];
            if (!this.grounded.has(item))
                item.matrix[13] += Math.max(BASE, terrainHeight(item.matrix[12], item.matrix[14])) - BASE;
        }
        // Two composed flowering borders frame the cottage garden, away from the bridge/paths.
        hydrangea(b, 2.64, .24, -5.30, .82, true);
        hydrangea(b, 3.00, .24, -6.35, .66, false);
        hydrangea(b, -2.4, .24, -7.52, .78, false);
        hydrangea(b, 10.18, .24, -6.91, .66, true);
        for (const [xx, zz] of [[-2.35, -6.35], [8, 2.5], [8, -6.1], [1.45, 6.5], [-11.2, 5.4]])
            contact(b, xx, Math.max(BASE, terrainHeight(xx, zz)) + .02, zz, 2.2, 1.45);
        this.grounded.clear();
        // The honey clearing is reserved before adding its own static geometry.
        for (let i = b.count - 1; i >= 0; i--) {
            const item = b.items[i];
            if (nearHoney(item.matrix[12], item.matrix[14])) {
                b.items.splice(i, 1);
                b.count--;
            }
        }
        scienceStatic(b, this.navigation);
        honeyStatic(b, this.navigation);
        playStatic(b, this.navigation);
        parkPlayyard(b);
        // Replant the expanded outline as authored clusters rather than an empty map extension.
        for (const [x, z, size] of [[18.7, -11.7, .83], [19.4, -9.9, .7], [17.5, -12.2, .6], [18.7, -.2, .63], [19.7, 7.4, .85], [17.9, 11.7, .72], [8.7, 13, .77], [5.1, 12.7, .58], [-5.9, 12.2, .72], [-17.4, 7.8, .75], [-18, -4.2, .85], [-14.8, -12, .78]])
            this.tree(x, z, size, true);
        // Non-walkable woodland backdrop continues the valley beyond its playable boundary.
        // No hidden paths or new scientific locations: the navigable map and colliders stay unchanged.
        for (let i = 0; i < 34; i++) {
            const a = Math.PI + (i / 33) * Math.PI, [bx, bz] = mapBoundary(a), f = 1.08 + .065 * Math.sin(i * 2.4), xx = bx * f, zz = bz * f;
            if (Math.abs(xx - riverX(zz)) < 2.2)
                continue;
            const first = b.count, size = .92 + (i % 4) * .105;
            gardenTree(b, xx, zz, size, i % 5 !== 0);
            const yy = terrainHeight(xx, zz) + 2 * (f - 1);
            for (let j = first; j < b.count; j++)
                b.items[j].matrix[13] += yy - BASE;
        }
    }
    update(s, player, heading, walking, time, reduced) {
        const b = this.dynamic;
        b.reset();
        const regionTopics = this.region ? REGIONS[this.region].topics : null;
        if (!this.region || regionTopics.some(t => t === 'buoyancy' || t === 'shadow' || t === 'pulley'))
            drawPlayyard(b, s, reduced ? 0 : time);
        this.avatar(b, player, heading, walking, reduced ? 0 : time);
        if (!this.region || regionTopics.includes('uv')) {
            const uvp = s?.topic === 'uv' ? s.uv : uv.defaults(), p = probePosition(uvp.probe), shade = shadePosition(uvp.shade);
            // Three physical docking positions, one draggable observation probe.
            for (let i = 0; i < 3; i++) {
                const q = probePosition(i);
                b.add('cylinder', q[0], .38, q[2], .66, .16, .66, i === uvp.probe ? '#dedbc0' : '#91a695');
                b.add('ring', q[0], .49, q[2], .39, .39, .39, '#e3ddbf');
            }
            b.add('cylinder', p[0], .94, p[2], .16, 1.0, .16, C.metal);
            b.add('box', p[0], 1.37, p[2], .55, .47, .35, C.cream);
            b.add('box', p[0], 1.41, p[2] + .19, .38, .28, .03, '#90b2b6');
            b.add('sphere', p[0], 1.7, p[2], .36, .3, .36, '#d8ded7');
            for (let j = 0; j < 3; j++)
                b.add('box', p[0] - .1 + j * .1, 1.39, p[2] + .215, .026, .14, .02, '#f4ebcf');
            b.add('cylinder', shade[0] + 1.28, 1.6, shade[2] - .32, .13, 2.95, .13, C.wood);
            b.add('cylinder', shade[0] + 1.28, .4, shade[2] - .32, .68, .15, .68, C.stone);
            beam(b, [shade[0] + 1.28, 3.06, shade[2] - .32], [shade[0], 3.32, shade[2]], .12, C.wood);
            if (s?.topic === 'uv' && s.layer) {
                b.add('ring', shade[0], 3, shade[2], 1.55, 1, 1.55, '#c2b08b');
                for (let i = 0; i < 8; i++) {
                    const a = i * Math.PI / 4;
                    beam(b, [shade[0], 3.6, shade[2]], [shade[0] + Math.cos(a) * 1.48, 3, shade[2] + Math.sin(a) * 1.48], .055, '#c5b391');
                }
            }
            else {
                b.add('parasol', shade[0], 3.28, shade[2], 3.1, .62, 3.1, '#a5c6ac', 0, 0, 0, 9);
            }
            b.add('sphere', shade[0], 3.64, shade[2], .13, .17, .13, C.wood);
            if (uvp.weather === 'cloudy') {
                for (let i = 0; i < 5; i++) {
                    const x = -11.2 + i * 1.05, z = -3.8 + (i % 2) * .4;
                    b.add('sphere', x, 5.25 + Math.sin(i) * .14, z, 2, 1.05, 1.4, '#d5e0df');
                    b.add('sphere', x + .4, 5.64, z, 1.25, .85, 1.1, '#e1e7e1');
                }
            }
            if (s?.topic === 'uv' && s.layer) {
                const sheltered = uv.evaluate(uvp).sheltered;
                const top = [p[0] - .3, 4.6, p[2] - .3];
                if (s.deepLayer !== 'sky') {
                    for (let j = 0; j < 6; j++) {
                        const t = j / 6;
                        if (sheltered && j > 2)
                            continue;
                        const a = [top[0] + .3 * t, top[1] - 2.7 * t, top[2] + .3 * t], c = [a[0] + .015, a[1] - .26, a[2] + .015];
                        beam(b, a, c, .045, '#b79a60');
                    }
                    b.add('cone', p[0], 1.96, p[2], .2, .24, .2, '#b79a60', Math.PI);
                }
                if (s.deepLayer !== 'direct') {
                    for (const side of [-1, 1])
                        for (let j = 0; j < 5; j++) {
                            const t = j / 5;
                            const a = [p[0] + side * (2.2 - 1.9 * t), 1.72 + (1 - t) * 1.25, p[2] + 1.3 * (1 - t)], c = [a[0] - side * .18, a[1] - .12, a[2] - .13];
                            beam(b, a, c, .04, '#7397a4');
                        }
                }
                if (s.phase === 'running')
                    b.add('sphere', p[0], 1.8 + (.5 + .5 * Math.sin(s.elapsed * 4)) * .5, p[2], .13, .13, .13, '#d5b66f');
            }
        }
        if (!this.region || regionTopics.includes('food'))
            this.foodScene(b, s?.topic === 'food' ? s : null);
        if (!this.region || regionTopics.includes('hands'))
            this.handsScene(b, s?.topic === 'hands' ? s : null, time);
        if (!this.region || regionTopics.some(t => t === 'optics' || t === 'balance' || t === 'sound'))
            drawScience(b, s, reduced, this.region ? regionTopics.filter((t) => t === 'optics' || t === 'balance' || t === 'sound') : false);
        if (!this.region || regionTopics.includes('honey'))
            drawHoney(b, s);
        if (this.region)
            drawRegion(b, this.region, reduced ? 0 : time);
        return b;
    }
    avatar(b, pos, yaw, walking, time) {
        const sway = walking ? Math.sin(time * 7) : 0, bob = walking ? Math.abs(sway) * .04 : Math.sin(time * 1.6) * .012, c = Math.cos(yaw), s = Math.sin(yaw);
        const part = (shape, x, y, z, w, h, d, col, rx = 0) => b.add(shape, pos[0] + (x * c + z * s) * 1.12, this.heightAt(...pos) + .085 + (y + bob) * 1.12, pos[1] + (-x * s + z * c) * 1.12, w * 1.12, h * 1.12, d * 1.12, col, rx, yaw);
        b.add('decal', pos[0], this.heightAt(...pos) + .025, pos[1], .64, 1, .54, '#5a6960', 0, 0, 0, 8);
        part('bevel', 0, .72, 0, .58, .67, .43, '#6ca7a4');
        part('soft', 0, 1.24, 0, .44, .49, .43, '#f2cbaa');
        part('soft', 0, 1.39, -.05, .47, .27, .43, '#624e42');
        part('soft', 0, 1.53, 0, .57, .24, .54, '#eee7d0');
        part('bevel', 0, 1.01, .21, .31, .11, .06, '#d58d78');
        part('bevel', .12, .85, .22, .1, .3, .065, '#d58d78');
        part('cylinder', 0, 1.45, .025, .7, .05, .65, '#f4e9cc');
        b.add('ring', pos[0], this.heightAt(...pos) + .055, pos[1], .70, .035, .70, '#f6efce', 0, 0, 0, 7);
        part('bevel', -.11, 1.25, .214, .045, time > 0 && Math.cos(time * 1.35) > .997 ? .012 : .05, .02, '#4f514a');
        part('bevel', .11, 1.25, .214, .045, time > 0 && Math.cos(time * 1.35) > .997 ? .012 : .05, .02, '#4f514a');
        for (const side of [-1, 1]) {
            part('soft', side * .16, 1.17, .188, .075, .037, .028, '#d9a997');
            part('bevel', side * .19, .82, -.05, .04, .37, .41, '#d5bd92');
        }
        part('soft', 0, 1.16, .223, .049, .035, .028, '#bc9678');
        part('bevel', 0, .65, .193, .15, .12, .025, '#d7e4d4');
        part('soft', .26, 1.5, .1, .077, .072, .05, '#d6ab83');
        part('bevel', 0, .8, -.23, .41, .5, .22, '#ccae7c');
        part('bevel', 0, .89, -.36, .25, .08, .03, '#927859');
        // Hatband, embroidered pocket, cap seam, belt, pack piping and boot soles.
        part('cylinder', 0, 1.49, 0, .565, .045, .54, '#b78d67');
        part('bevel', 0, .52, .13, .42, .045, .21, '#c9b188');
        part('bevel', 0, .76, -.365, .23, .2, .06, '#dec8a4');
        part('bevel', 0, .79, -.405, .025, .075, .018, '#997757');
        for (const side of [-1, 1]) {
            part('bevel', side * .195, .81, -.35, .025, .35, .02, '#ebd8b5');
            part('soft', side * .14, .04, .08, .24, .06, .36, '#5d655b');
            part('bevel', side * .14, .095, .20, .12, .025, .02, '#e3d6b6');
            part('soft', side * .26, 1.23, .02, .10, .16, .13, '#e2bf9d');
        }
        for (let i = 0; i < 3; i++)
            part('soft', .03, .74 + i * .07, .224, .025, .025, .013, '#e6dac0');
        for (const side of [-1, 1]) {
            part('cylinder', side * .14, .29, 0, .17, .51, .19, '#e7dfc2', side * sway * .5);
            part('soft', side * .14, .065, .07, .22, .18, .35, '#746b59');
            part('soft', side * .35, .72, 0, .16, .5, .16, '#6ca7a4', -side * sway * .55);
            part('soft', side * .35, .46, Math.sin(side * sway * .55) * .16, .15, .17, .15, '#f2cbaa');
        }
    }
    foodScene(b, s) {
        const p = s?.food ?? food.defaults(), y = .32 + (s?.foodHeight() ?? 1.5), x = 8, z = -1;
        b.add('box', x, .205, z, 2.1, .08, 1.8, C.paleWood);
        if (p.surface === 'tile') {
            for (let i = 0; i < 4; i++)
                for (let j = 0; j < 4; j++)
                    b.add('box', x + (i - 1.5) * .49, .26, z + (j - 1.5) * .41, .46, .06, .38, (i + j) % 2 ? '#d8dbcd' : '#e8e8d8');
        }
        else {
            b.add('box', x, .26, z, 1.97, .1, 1.66, '#bd9f90');
            for (let i = 0; i < 20; i++)
                b.add('box', x + (i - 9.5) * .095, .33, z, .029, .05, 1.57, '#cdb6a4');
        }
        b.add('box', x + 1.5, 1.1, z - 1, .12, 1.9, .12, C.wood);
        beam(b, [x + 1.5, 2.1, z - 1], [x, 2.1, z - .6], .1, C.wood);
        b.add('ring', x + 1.5, 1.5, z - .94, .21, .21, .21, C.metal, Math.PI / 2);
        if (p.food === 'watermelon') {
            b.add('roof', x, y + .24, z, 1.36, .49, .88, '#72936d', s?.flip ? Math.PI : 0);
            b.add('roof', x, y + .3, z, 1.22, .43, .82, '#d98f7e', s?.flip ? Math.PI : 0);
            for (const d of [-1, 1])
                for (let i = 0; i < 3; i++)
                    b.add('sphere', x + d * (.2 + i * .12), y + .5 - i * .065, z + .43, .05, .065, .025, '#705d50');
        }
        else {
            b.add('sphere', x, y + .2, z, 1.4, .42, 1.02, '#b38a5f');
            b.add('sphere', x, y + .27, z, 1.29, s?.flip ? .1 : .28, .93, s?.flip ? '#ead8b8' : '#e1c799');
            if (!s?.flip)
                for (let i = 0; i < 3; i++)
                    b.add('box', x + (i - 1) * .3, y + .405, z, .08, .02, .51, '#c6ad80', 0, .15);
        }
        if (s?.layer) {
            for (const t of food.evaluate(p).tokens) {
                const height = t.transferred ? y + .56 : .4;
                b.add('sphere', x + t.x, height, z + t.z, .07, .07, .07, t.transferred ? '#647c9c' : '#9f947b');
            }
            b.add('ring', x, .4, z, 1.1, 1, 1, '#d3bf93');
        }
        b.add('ring', 10, .65, -.8, .45, .45, .45, C.metal, Math.PI / 2);
        beam(b, [10, .27, -.8], [10, .03, -.8], .1, C.wood);
    }
    handsScene(b, s, time) {
        const p = s?.hands ?? hands.defaults(), r = hands.evaluate(p);
        for (let side = 0; side < 2; side++) {
            const x = side ? 8.7 : 7.15, y = 1.53, z = 6.05;
            b.add('sphere', x, y, z, .76, .29, 1.0, '#e5bea0');
            b.add('cylinder', x, 1.48, z + .52, .44, .44, .38, '#dbc1a2', Math.PI / 2);
            for (let f = 0; f < 4; f++) {
                const xx = x + (f - 1.5) * .18, zz = z - .58 - (f === 0 || f === 3 ? 0 : .13);
                b.add('cylinder', xx, y, zz, .145, .63, .145, '#e5bea0', Math.PI / 2);
                b.add('sphere', xx, y, zz - .3, .147, .15, .18, '#e5bea0');
                if (s?.flip)
                    b.add('box', xx, y + .076, zz - .21, .1, .02, .15, '#ead0b3');
            }
            const xx = x + (side ? -1 : 1) * .5;
            b.add('cylinder', xx, y, z - .15, .2, .6, .2, '#e5bea0', Math.PI / 2, side ? -.55 : .55);
        }
        for (let i = 0; i < 6; i++) {
            const q = handAnchors[i];
            const pos = i === 5 ? (s?.flip ? [8.7, 1.71, 6.08] : [9.5, 1.51, 6.7]) : q;
            if (i === 5 && !s?.flip)
                continue;
            for (let j = 0; j < r.dirt[i]; j++)
                b.add('sphere', pos[0] + Math.sin(j * 2) * .19, pos[1] - .012, pos[2] + Math.cos(j * 3) * .2, .19, .024, .16, '#bb9b68');
            if (s?.layer)
                for (let j = 0; j < r.factors[i]; j++)
                    b.add('sphere', pos[0] + Math.sin(j * 2.4) * .22, pos[1] + .045, pos[2] + Math.cos(j * 2.4) * .18, .075, .055, .075, '#738b9b');
            if (p.coverage[i] > .01 && p.method === 'soap' && s?.phase !== 'observed')
                for (let j = 0; j < 3; j++)
                    b.add('sphere', pos[0] + Math.sin(j * 2) * .19, pos[1] + .05, pos[2] + Math.cos(j * 3) * .17, .18, .12, .16, '#edf0e3');
            if (s?.layer)
                b.add('ring', pos[0], pos[1] + .012, pos[2], .29, .3, .29, p.coverage[i] > .98 ? '#f1e5bb' : '#9ba998');
        }
        b.add('sphere', 6.08, 1.61, 5.1, .48, .18, .3, '#dfcaaa');
        b.add('box', 6.09, 1.48, 5.1, .62, .08, .41, C.cream);
        b.add('box', 10, 1.83, 5.18, .44, .79, .34, '#9ab6bf');
        b.add('box', 10, 1.82, 5.38, .34, .37, .025, C.cream);
        b.add('cylinder', 10, 2.29, 5.18, .13, .15, .13, C.metal);
        b.add('box', 10.09, 2.36, 5.18, .34, .07, .09, C.metal);
        if (s?.phase === 'finishing' && p.method !== 'sanitiser') {
            for (let i = 0; i < 3; i++)
                beam(b, [7.96 + i * .035, 2.11, 5.04], [7.96 + i * .035, 1.4, 5.22 + Math.sin(time * 4) * .04], .029, '#96bfc4');
        }
        if (s?.phase === 'finishing' && p.method === 'sanitiser')
            b.add('ring', 8, 1.77, 5.9, 1.55, 1, 1.1, '#dacb9b');
    }
}