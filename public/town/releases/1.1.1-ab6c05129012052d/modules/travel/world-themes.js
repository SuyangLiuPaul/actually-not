/**
 * Authored miniature country scenes. These are intentionally stylised and do not claim
 * to reproduce a real neighbourhood or a whole culture. Science stations reuse the
 * same reviewed teaching models as the original town.
 */
import { Builder } from '../game/renderer.js';
import { Navigation } from '../game/navigation.js';
import { gardenTree } from '../game/atelier.js';
import { blossom } from '../game/playyard-scene.js';
import { scienceStatic, SCIENCE_SITES } from '../game/science-scenes.js';
import { playStatic, PLAY_SITES } from '../game/playyard-scene.js';
import { honeyStatic } from '../game/honey-scene.js';
import { REGIONS } from './atlas.js';
const APPROACH = { uv: [-6.7, 2.2], food: [5.7, .3], hands: [5.3, 6.8], optics: [10.7, 11.9], balance: [15.5, -4.9], sound: [16, 5], honey: [-7.9, 11.3], buoyancy: [-11, 19.7], shadow: [1.4, 21.1], pulley: [13.2, 20.2] };
const IVORY = '#fff0ce', WOOD = '#b97d50', DARK = '#3f675d', WATER = '#57bdcb', LEAF = '#66aa68';
function box(b, x, y, z, w, h, d, c, ry = 0, flag = 0, hide = '') { b.add('bevel', x, y, z, w, h, d, c, 0, ry, 0, flag, hide); }
function obstacle(nav, x, z, w, d, round = false) { nav.obstacles.push({ x, z, w, d, round }); }
function pathTiles(b, a, d, colour) {
    const dist = Math.hypot(d[0] - a[0], d[1] - a[1]), n = Math.max(2, Math.ceil(dist / .72));
    for (let i = 0; i <= n; i++) {
        const t = i / n, x = a[0] + (d[0] - a[0]) * t, z = a[1] + (d[1] - a[1]) * t, ang = Math.atan2(d[0] - a[0], d[1] - a[1]);
        box(b, x, .20, z, .54, .055, .72, i % 3 ? colour : IVORY, ang);
    }
}
function pathGarden(b, a, d, accent, dry, seed) {
    const dx = d[0] - a[0], dz = d[1] - a[1], dist = Math.hypot(dx, dz);
    if (dist < 2)
        return;
    const ux = dx / dist, uz = dz / dist, nx = -uz, nz = ux, steps = Math.max(3, Math.min(10, Math.floor(dist / 2.15)));
    for (let i = 1; i < steps; i++) {
        const t = i / steps, side = ((i + seed) % 2 ? 1 : -1), offset = .88 + ((i * 7 + seed) % 3) * .16;
        const x = a[0] + dx * t + nx * offset * side, z = a[1] + dz * t + nz * offset * side;
        if (dry) {
            b.add('soft', x, .22, z, .42 + ((i + seed) % 2) * .13, .22, .34, (i + seed) % 3 === 0 ? '#9ca477' : '#cbb58d', 0, i * .47);
            if ((i + seed) % 3 === 0)
                b.add('soft', x + .18, .35, z - .10, .18, .24, .14, accent, 0, i * .3);
        }
        else {
            blossom(b, x, .54 + ((i + seed) % 2) * .05, z, .20, (i + seed) % 3 ? accent : '#f2d7aa');
            if ((i + seed) % 3 === 0)
                b.add('soft', x + .19, .22, z - .15, .35, .18, .28, '#91ac7a', 0, i * .5);
        }
    }
}
function tinyResident(b, x, z, shirt, phase) {
    const skin = '#d7aa87', dark = '#5f615d';
    b.add('cylinder', x, .72, z, .17, .66, .17, shirt);
    b.add('sphere', x, 1.17, z, .22, .24, .21, skin);
    b.add('soft', x, 1.33, z - .02, .26, .10, .22, dark, 0, phase * .2);
    for (const side of [-1, 1]) {
        b.add('cylinder', x + side * .20, .72, z, .055, .55, .055, skin, 0, 0, side * .18);
        b.add('cylinder', x + side * .10, .25, z, .065, .52, .065, dark, 0, 0, side * .06);
    }
}
function tinyCompanion(b, x, z, accent) {
    b.add('soft', x, .30, z, .54, .35, .28, accent);
    b.add('sphere', x + .30, .42, z, .22, .22, .22, accent);
    for (const side of [-1, 1])
        b.add('cone', x + .27 + side * .12, .66, z, .10, .20, .08, accent, 0, 0, side * .2);
    for (const side of [-1, 1])
        b.add('sphere', x + .34 + side * .07, .45, z + .18, .026, .035, .025, '#4e5651');
}
function recolourTree(b, x, z, s, leaf, pine = false) {
    const start = b.count;
    gardenTree(b, x, z, s, pine);
    for (let i = start; i < b.count; i++) {
        const o = b.items[i];
        if (o.shape === 'crown' || o.shape === 'sphere' || o.shape === 'soft')
            o.color = hex(leaf);
    }
}
function hex(c) { const n = parseInt(c.slice(1), 16); return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]; }
function plant(b, nav, x, z, kind, s = 1, leaf = LEAF) {
    if (kind === 'broad' || kind === 'pine' || kind === 'maple') {
        recolourTree(b, x, z, s, kind === 'maple' ? '#b78268' : leaf, kind === 'pine');
        obstacle(nav, x, z, .5 * s, .5 * s, true);
        return;
    }
    if (kind === 'palm') {
        b.add('cylinder', x, 1.35 * s, z, .18 * s, 2.5 * s, .18 * s, '#9b7958', 0, 0, .08);
        for (let i = 0; i < 7; i++) {
            const a = i * Math.PI * 2 / 7;
            b.add('soft', x + Math.cos(a) * .55 * s, 2.7 * s, z + Math.sin(a) * .55 * s, 1.15 * s, .15 * s, .38 * s, leaf, 0, a, (i % 2 ? -.25 : .25));
        }
        obstacle(nav, x, z, .34 * s, .34 * s, true);
        return;
    }
    if (kind === 'acacia') {
        b.add('cylinder', x, .95 * s, z, .16 * s, 1.8 * s, .16 * s, '#8d6d50', 0, 0, .18);
        for (const dx of [-.55, 0, .55])
            b.add('soft', x + dx * s, 1.95 * s, z, 1.3 * s, .33 * s, .8 * s, leaf);
        obstacle(nav, x, z, .4 * s, .4 * s, true);
        return;
    }
    if (kind === 'cypress') {
        b.add('cylinder', x, .8 * s, z, .12 * s, 1.5 * s, .12 * s, '#84664b');
        for (let i = 0; i < 4; i++)
            b.add('cone', x, 1.15 * s + i * .42 * s, z, .53 * s, .95 * s, .53 * s, leaf);
        obstacle(nav, x, z, .3 * s, .3 * s, true);
        return;
    }
    if (kind === 'bamboo') {
        for (let i = 0; i < 5; i++) {
            const xx = x + (i - 2) * .14 * s, h = (1.8 + (i % 3) * .28) * s;
            b.add('cylinder', xx, h / 2, z, .055 * s, h, .055 * s, '#71945f');
            for (let k = 0; k < 5; k++) {
                const y = .35 * s + k * .34 * s;
                b.add('ring', xx, y, z, .04 * s, .08 * s, .04 * s, '#b7c588');
                b.add('soft', xx + .18 * s, y + .12 * s, z, .42 * s, .10 * s, .07 * s, leaf, 0, i * .3, .35);
            }
        }
        obstacle(nav, x, z, .42 * s, .42 * s, true);
        return;
    }
    if (kind === 'fern') {
        b.add('cylinder', x, .32 * s, z, .045 * s, .6 * s, .045 * s, '#66885f');
        for (let i = 0; i < 8; i++) {
            const a = i * Math.PI / 4;
            b.add('soft', x + Math.cos(a) * .4 * s, .56 * s, z + Math.sin(a) * .4 * s, .75 * s, .11 * s, .18 * s, leaf, 0, a, .18);
        }
        return;
    }
    // agave
    for (let i = 0; i < 9; i++) {
        const a = i * Math.PI * 2 / 9;
        b.add('soft', x + Math.cos(a) * .18 * s, .3 * s, z + Math.sin(a) * .18 * s, .16 * s, .62 * s, .12 * s, leaf, .65, 0, -Math.cos(a) * .4);
    }
    obstacle(nav, x, z, .35 * s, .35 * s, true);
}
function flowerBed(b, x, z, w, colour) { box(b, x, .28, z, w, .25, .72, '#c9b48e'); for (let i = 0; i < Math.max(4, Math.floor(w / .32)); i++)
    blossom(b, x - w * .42 + i * w * .84 / Math.max(3, Math.floor(w / .32) - 1), .68 + (i % 2) * .08, z, .26, i % 2 ? colour : '#f2d49c'); }
function lamp(b, x, z, accent) { box(b, x, .88, z, .08, 1.55, .08, DARK); b.add('soft', x, 1.76, z, .42, .48, .35, accent); b.add('roof', x, 2.07, z, .55, .2, .5, WOOD); }
function house(b, nav, x, z, w, d, wall, roof, kind = 'gable', accent = '#7c9f96') {
    if (kind === 'stilt')
        for (const sx of [-1, 1])
            for (const sz of [-1, 1])
                box(b, x + sx * w * .37, .55, z + sz * d * .34, .12, 1.05, .12, WOOD);
    const y = kind === 'stilt' ? 1.65 : 1.25;
    box(b, x, y, z, w, 2.15, d, wall);
    if (kind === 'flat') {
        box(b, x, 2.42, z, w + .2, .18, d + .2, roof);
        for (const sx of [-1, 1])
            for (let i = 0; i < 4; i++)
                box(b, x + sx * w * .49, 2.72, z - d * .33 + i * d * .22, .07, .55, .07, accent);
    }
    else if (kind === 'blue') {
        b.add('soft', x, 2.62, z, w * .9, .9, d * .86, roof);
    }
    else {
        b.add('roof', x, 2.72, z, w + .65, 1.12, d + .45, roof);
        if (kind === 'hanok') {
            box(b, x, 2.35, z + d * .51, w + .72, .09, .12, DARK);
            for (let i = 0; i < 7; i++)
                box(b, x - w * .42 + i * w * .14, 2.03, z + d * .515, .055, .6, .055, DARK);
        }
    }
    box(b, x, y - .25, z + d * .515, .72, 1.4, .08, accent);
    for (const sx of [-1, 1]) {
        box(b, x + sx * w * .26, y + .25, z + d * .52, .78, .78, .07, '#b9d3cc');
        box(b, x + sx * w * .26, y + .25, z + d * .56, .055, .82, .055, IVORY);
        box(b, x + sx * w * .26, y + .25, z + d * .56, .82, .055, .055, IVORY);
    }
    box(b, x, .26, z + d * .66, w + .35, .22, .7, '#d8c49b');
    obstacle(nav, x, z, w + .2, d + .25);
}
function arch(b, nav, x, z, wall, accent) { for (const sx of [-1, 1])
    box(b, x + sx * .9, 1.3, z, .48, 2.5, .7, wall); box(b, x, 2.35, z, 2.25, .5, .72, wall); b.add('ring', x, 1.48, z + .38, .72, .72, .12, accent, Math.PI / 2); obstacle(nav, x - .9, z, .5, .72); obstacle(nav, x + .9, z, .5, .72); }
function gazebo(b, nav, x, z, roof, accent) { for (let i = 0; i < 6; i++) {
    const a = i * Math.PI / 3, xx = x + Math.cos(a) * 1.4, zz = z + Math.sin(a) * 1.4;
    box(b, xx, 1.45, zz, .12, 2.65, .12, accent);
    obstacle(nav, xx, zz, .15, .15, true);
} b.add('cone', x, 3.1, z, 3.4, 1.2, 3.4, roof); box(b, x, .28, z, 2.7, .2, 2.7, '#dcc9a8'); }
function scienceDecor(b, nav, topics) {
    const physics = topics.filter((t) => t === 'optics' || t === 'balance' || t === 'sound');
    if (physics.length) {
        const tb = new Builder(), tn = new Navigation();
        scienceStatic(tb, tn);
        for (const item of tb.items.slice(0, tb.count)) {
            const x = item.matrix[12], z = item.matrix[14];
            if (physics.some(t => { const c = SCIENCE_SITES[t]; return Math.abs(x - c.x) < 3.6 && Math.abs(z - c.z) < 3.5; }))
                b.items[b.count++] = item;
        }
        for (const o of tn.obstacles)
            if (physics.some(t => { const c = SCIENCE_SITES[t]; return Math.abs(o.x - c.x) < 3.7 && Math.abs(o.z - c.z) < 3.6; }))
                nav.obstacles.push(o);
    }
    const play = topics.filter((t) => t === 'buoyancy' || t === 'shadow' || t === 'pulley');
    if (play.length) {
        const tb = new Builder(), tn = new Navigation();
        playStatic(tb, tn);
        for (const item of tb.items.slice(0, tb.count)) {
            const x = item.matrix[12], z = item.matrix[14];
            if (play.some(t => { const c = PLAY_SITES[t]; return Math.abs(x - c.x) < 3.45 && Math.abs(z - c.z) < 3.8; }))
                b.items[b.count++] = item;
        }
        for (const o of tn.obstacles)
            if (play.some(t => { const c = PLAY_SITES[t]; return Math.abs(o.x - c.x) < 3.6 && Math.abs(o.z - c.z) < 3.9; }))
                nav.obstacles.push(o);
    }
    if (topics.includes('honey'))
        honeyStatic(b, nav);
    if (topics.includes('uv')) {
        for (let i = 0; i < 3; i++) {
            const x = -10.8 + i * 1.8;
            box(b, x, .25, -.8, .9, .12, .9, i === 1 ? '#e4d7b5' : '#d6c7a4');
        }
        for (const x of [-13.3, -5.6]) {
            box(b, x, 1.45, -1.2, .12, 2.6, .12, WOOD);
            box(b, x, 2.78, -1.2, .12, .12, 3.2, WOOD);
        }
    }
    if (topics.includes('food')) {
        box(b, 8, .7, -1, 4.1, .88, 3.6, '#e2cfaa');
        for (const sx of [-1, 1])
            for (const sz of [-1, 1])
                box(b, 8 + sx * 1.55, .33, -1 + sz * 1.2, .15, .62, .15, WOOD);
        obstacle(nav, 8, -1, 2.2, 1.9);
    }
    if (topics.includes('hands')) {
        box(b, 8, 1.05, 5.9, 4.4, .18, 2.0, '#d5c39f');
        for (const x of [6.35, 9.65])
            for (const z of [5.2, 6.6])
                box(b, x, .58, z, .14, .95, .14, WOOD);
        box(b, 10, 1.65, 5.15, .52, .92, .45, '#8fb5b8');
        obstacle(nav, 8, 5.9, 4.2, 2.1);
    }
}
function baseScene(b, nav, id) {
    const r = REGIONS[id], [l, h, t, d] = r.bounds, cx = (l + h) / 2, cz = (t + d) / 2;
    const ground = { oasis: '#dfbd68', savanna: '#c7aa59', aegean: '#a9c586', hacienda: '#c79b60', stepwell: '#cfaa6e', riad: '#d0a468', harbour: '#6fa68e', fjord: '#6fa68d', rainforest: '#54aa6c', terrace: '#67ad5c', tuscan: '#a8b85e', iberian: '#adb964', redwood: '#669568', lotus: '#5eaa70', bosphorus: '#b7b967', fynbos: '#7fa76b' }[r.theme] ?? '#79aa65';
    box(b, cx, -.25, cz, h - l + .15, .5, d - t + .15, ground);
    // softly articulated perimeter so the scene reads like a diorama rather than a square board.
    for (let i = 0; i < 28; i++) {
        const a = i * Math.PI * 2 / 28, rx = (h - l) * .49, rz = (d - t) * .49, x = cx + Math.cos(a) * rx, z = cz + Math.sin(a) * rz;
        b.add('soft', x, .12, z, 2.3, .45, 2.0, i % 3 ? ground : r.colour);
    }
    const dry = ['oasis', 'savanna', 'stepwell', 'riad', 'hacienda'].includes(r.theme);
    let routeIndex = 0;
    for (const topic of r.topics) {
        pathTiles(b, r.spawn, APPROACH[topic], dry ? '#e8d8b2' : '#d8d4b8');
        pathGarden(b, r.spawn, APPROACH[topic], r.accent, dry, routeIndex++);
    }
    scienceDecor(b, nav, r.topics);
    // Shared micro-details make every destination feel inhabited while keeping paths clear.
    const clusters = [[-6, -4], [5, -7], [-4, 15], [5, 14], [-17, 19]];
    for (let c = 0; c < clusters.length; c++) {
        const [x, z] = clusters[c];
        for (let i = 0; i < 5; i++) {
            const a = i * 1.256 + c * .37, xx = x + Math.cos(a) * (.34 + (i % 2) * .18), zz = z + Math.sin(a) * (.3 + (i % 3) * .12);
            if (dry)
                b.add('soft', xx, .24, zz, .42 + (i % 2) * .12, .22, .34, i % 2 ? '#d8c29b' : '#c9b184', 0, a);
            else
                blossom(b, xx, .55 + (i % 2) * .05, zz, .24, i % 2 ? r.accent : '#f0cf9c');
        }
    }
    for (let i = 0; i < 12; i++) {
        const a = i * Math.PI / 6, x = cx + Math.cos(a) * (h - l) * .445, z = cz + Math.sin(a) * (d - t) * .445;
        b.add('soft', x, .12, z, .62 + (i % 3) * .14, .24, .52, i % 2 ? '#d7d0b6' : '#b8c79e', 0, a);
    }
    // Arrival marker: decorative only, placed beside rather than across the spawn route.
    box(b, 3.15, .88, -9.65, .09, 1.45, .09, DARK);
    box(b, 4.35, .88, -9.65, .09, 1.45, .09, DARK);
    box(b, 3.75, 1.38, -9.65, 1.45, .62, .10, IVORY);
    box(b, 3.75, 1.38, -9.59, 1.12, .14, .04, r.accent);
}
function palette(id) { const r = REGIONS[id]; return { wall: r.theme === 'aegean' || r.theme === 'iberian' ? '#fff4d8' : r.theme === 'oasis' || r.theme === 'stepwell' || r.theme === 'riad' || r.theme === 'bosphorus' ? '#edca86' : r.theme === 'jiangnan' || r.theme === 'hanok' ? '#fff0d5' : r.theme === 'harbour' ? '#d77966' : r.theme === 'rainforest' || r.theme === 'lotus' ? '#e6b36f' : r.theme === 'tuscan' ? '#edca8a' : r.theme === 'fynbos' ? '#e8cc93' : '#ead3a5', roof: r.theme === 'jiangnan' || r.theme === 'hanok' ? '#4e7770' : r.theme === 'aegean' || r.theme === 'iberian' || r.theme === 'bosphorus' ? '#55a1bd' : r.theme === 'harbour' ? '#416d70' : r.theme === 'alpine' || r.theme === 'lakeside' || r.theme === 'fjord' || r.theme === 'redwood' ? '#765b48' : r.theme === 'tuscan' ? '#c86943' : '#c96f4e', accent: r.accent, leaf: r.theme === 'savanna' ? '#6c9660' : r.theme === 'rainforest' || r.theme === 'terrace' || r.theme === 'lotus' ? '#48a866' : r.theme === 'redwood' ? '#4e8558' : '#65a26c', flower: r.theme === 'provence' ? '#b48bd7' : r.theme === 'aegean' || r.theme === 'iberian' ? '#f0aeba' : r.theme === 'fynbos' ? '#df7f91' : '#ef9ea4' }; }
export function buildThemedRegion(id, b, nav) {
    const r = REGIONS[id], p = palette(id);
    baseScene(b, nav, id);
    // Keep architecture on the perimeter so all station approaches remain clear.
    switch (r.theme) {
        case 'jiangnan':
            house(b, nav, -15, -8, 5.2, 3.2, p.wall, p.roof, 'hanok', p.accent);
            house(b, nav, -7, -10, 4.2, 2.8, p.wall, p.roof, 'hanok', p.accent);
            arch(b, nav, -4, -10, p.wall, p.roof);
            for (const q of [[-18, 5], [-17, 10], [-4, 9]])
                plant(b, nav, q[0], q[1], 'bamboo', 1, p.leaf);
            for (let i = 0; i < 5; i++)
                lamp(b, -14 + i * 2.2, -3.8, '#e6b18c');
            flowerBed(b, -15, 14, 4, p.flower);
            break;
        case 'oasis':
            house(b, nav, -15, -9, 5.3, 3.5, p.wall, p.roof, 'flat', p.accent);
            arch(b, nav, -8, -10, p.wall, p.accent);
            gazebo(b, nav, -15, 5, p.roof, p.accent);
            for (const q of [[-18, -2], [-14, 10], [-5, 12], [-19, 16]])
                plant(b, nav, q[0], q[1], 'palm', 1.05, p.leaf);
            b.add('soft', -16, .04, -8, 4.2, .10, 4.2, WATER, 0, 0, 0, 2);
            break;
        case 'rainforest':
            house(b, nav, -15, -8, 5.0, 3.2, p.wall, p.roof, 'stilt', p.accent);
            house(b, nav, -8, -10, 3.8, 2.7, '#e1b178', '#6f8875', 'stilt', p.accent);
            for (const q of [[-18, -2], [-14, 8], [-7, 11], [-18, 16], [-3, 15]])
                plant(b, nav, q[0], q[1], q[1] > 10 ? 'palm' : 'broad', 1.15, p.leaf);
            for (const q of [[-12, 4], [-9, 8], [-4, 13]])
                plant(b, nav, q[0], q[1], 'fern', 1.2, p.leaf);
            box(b, -19.4, .08, 4, 3.6, .08, 37, WATER, 0, 2);
            break;
        case 'alpine':
        case 'lakeside':
        case 'fjord':
            house(b, nav, -15, -9, 5.4, 3.4, p.wall, p.roof, 'gable', p.accent);
            house(b, nav, -8, -10, 4.1, 3, p.wall, p.roof, 'gable', p.accent);
            for (const q of [[-18, 1], [-15, 8], [-8, 12], [-18, 17], [-2, 14]])
                plant(b, nav, q[0], q[1], r.theme === 'lakeside' ? 'maple' : 'pine', 1.1, p.leaf);
            flowerBed(b, -13, 5, 4.3, p.flower);
            if (r.theme !== 'alpine')
                box(b, -19.4, .08, 15, 3.7, .08, 17, WATER, 0, 2);
            break;
        case 'provence':
            house(b, nav, -15, -9, 5.6, 3.6, '#e4d6bb', '#819492', 'gable', '#9f86a7');
            house(b, nav, -7, -10, 4.2, 3.0, '#e9dcc4', '#819492', 'gable', '#9f86a7');
            for (let row = 0; row < 5; row++)
                for (let i = 0; i < 14; i++)
                    blossom(b, -18 + i * .65, .52, 4 + row * .8, .28, row % 2 ? '#b8a6ca' : '#c5b5d8');
            for (const q of [[-18, 12], [-7, 12], [-3, 5]])
                plant(b, nav, q[0], q[1], 'cypress', 1, p.leaf);
            break;
        case 'savanna':
            house(b, nav, -14, -9, 5.3, 3.2, '#d8c29b', '#8c7b63', 'flat', p.accent);
            gazebo(b, nav, -13, 6, '#d8c29b', p.accent);
            for (const q of [[-18, -2], [-15, 12], [-6, 10], [-18, 19], [-3, 17]])
                plant(b, nav, q[0], q[1], 'acacia', 1.05, p.leaf);
            for (let i = 0; i < 28; i++)
                b.add('soft', -19 + (i % 7) * 2.7, .32, 2 + Math.floor(i / 7) * 4.3, .12, .8, .10, '#b89a5e', 0, (i % 5) * .3, .2);
            break;
        case 'aegean':
            for (const [x, z, w] of [[-16, -8, 4.8], [-10, -10, 3.7], [-17, 3, 3.4]])
                house(b, nav, x, z, w, 3, p.wall, p.roof, 'blue', p.accent);
            for (const q of [[-17, 10], [-10, 9], [-3, 13]])
                plant(b, nav, q[0], q[1], 'cypress', .9, p.leaf);
            box(b, -19.4, .08, 7, 3.4, .08, 34, WATER, 0, 2);
            flowerBed(b, -12, 4, 3.5, p.flower);
            break;
        case 'hacienda':
            house(b, nav, -15, -9, 5.2, 3.3, '#d69a72', '#a95f4f', 'flat', '#5c948b');
            arch(b, nav, -8, -10, '#d69a72', '#fff0ce');
            gazebo(b, nav, -15, 7, '#c66c58', '#5c948b');
            for (const q of [[-18, 2], [-11, 11], [-4, 10], [-18, 16]])
                plant(b, nav, q[0], q[1], 'agave', 1.2, '#6e9887');
            for (let i = 0; i < 12; i++) {
                const x = -17 + i * 1.1;
                b.add('roof', x, 3.2, -3, .65, .45, .04, ['#d98369', '#e0bb6c', '#75a49a'][i % 3]);
            }
            break;
        case 'stepwell':
            house(b, nav, -15, -9, 5.5, 3.4, p.wall, p.roof, 'flat', p.accent);
            for (let s = 0; s < 5; s++)
                box(b, -15, .12 + s * .16, 3 + s * .55, 7 - s * .9, .14, 1.1, '#d8bd8d');
            gazebo(b, nav, -6, 10, '#c88764', p.accent);
            for (const q of [[-18, 11], [-11, 14], [-3, 14]])
                plant(b, nav, q[0], q[1], 'broad', .9, p.leaf);
            for (let i = 0; i < 18; i++)
                blossom(b, -18 + (i % 6) * .7, .62, 6 + Math.floor(i / 6) * .7, .25, i % 2 ? '#e3a85e' : '#efc56e');
            break;
        case 'riad':
            house(b, nav, -15, -9, 5.3, 3.5, p.wall, p.roof, 'flat', p.accent);
            arch(b, nav, -8, -10, p.wall, p.accent);
            gazebo(b, nav, -14, 4, '#d9ab7b', p.accent);
            b.add('soft', -15, .06, 8, 3.3, .08, 3.3, WATER, 0, 0, 0, 2);
            for (const q of [[-18, 2], [-11, 12], [-4, 12]])
                plant(b, nav, q[0], q[1], 'broad', .9, '#79966b');
            for (let i = 0; i < 7; i++)
                box(b, -16 + i * .45, .22, -3.3, .38, .05, .38, [p.accent, IVORY, '#d2a36f'][i % 3]);
            break;
        case 'harbour':
            house(b, nav, -15, -9, 4.8, 3.1, p.wall, p.roof, 'gable', p.accent);
            house(b, nav, -9, -10, 3.8, 2.7, '#c88768', p.roof, 'gable', p.accent);
            for (const q of [[-17, 2], [-13, 10], [-5, 12], [-18, 18]])
                plant(b, nav, q[0], q[1], 'pine', 1.1, p.leaf);
            box(b, -19.4, .08, 7, 3.7, .08, 34, WATER, 0, 2);
            for (let i = 0; i < 13; i++)
                box(b, -17 + i * .55, .24, 4, .52, .12, 2.2, '#d0b28a');
            break;
        case 'hanok':
            house(b, nav, -15, -9, 5.4, 3.2, p.wall, p.roof, 'hanok', p.accent);
            house(b, nav, -8, -10, 4.1, 2.8, p.wall, p.roof, 'hanok', p.accent);
            arch(b, nav, -4, -10, '#d9d0b8', p.roof);
            for (const q of [[-18, 4], [-14, 12], [-5, 12]])
                plant(b, nav, q[0], q[1], 'broad', 1, p.leaf);
            flowerBed(b, -12, 5, 4.2, p.flower);
            break;
        case 'terrace':
            for (let s = 0; s < 5; s++) {
                box(b, -15, .10 + s * .14, 3 + s * 2, 8 - s * .7, .16, 1.55, s % 2 ? '#8fae70' : '#7fa365');
                box(b, -15, .21 + s * .14, 3 + s * 2, 7.3 - s * .65, .03, 1.1, '#aad2bb', 0, 2);
            }
            gazebo(b, nav, -12, -8, '#b89261', '#6e956b');
            for (const q of [[-18, -2], [-16, 15], [-6, 13], [-3, 7]])
                plant(b, nav, q[0], q[1], 'bamboo', 1.05, p.leaf);
            house(b, nav, -5, -10, 3.8, 2.8, '#d9ba8c', '#7c8f6f', 'stilt', p.accent);
            break;
        case 'tuscan':
            house(b, nav, -15, -9, 5.5, 3.4, p.wall, p.roof, 'gable', '#8a896d');
            house(b, nav, -8, -10, 4.1, 2.8, '#e7cfaa', p.roof, 'gable', '#8a896d');
            for (const q of [[-18, 1], [-18, 7], [-17, 14], [-5, 12]])
                plant(b, nav, q[0], q[1], 'cypress', 1.15, '#637f62');
            for (let row = 0; row < 4; row++) {
                const z = 4 + row * 1.45;
                for (let i = 0; i < 7; i++) {
                    const x = -14 + i * 1.15;
                    box(b, x, .75, z, .055, 1.18, .055, '#896c4f');
                    b.add('soft', x, .96, z, .75, .30, .35, '#728e62');
                }
            }
            flowerBed(b, -7, 7.5, 4.3, '#c6a3c1');
            // Vineyard rest corner: barrels, pergola and harvest baskets.
            for (const z of [9.4, 10.3]) {
                b.add('cylinder', -9.2, .55, z, .45, .82, .45, '#a47654', Math.PI / 2);
                b.add('torus', -9.2, .55, z, .46, .18, .46, '#6f6a5e', Math.PI / 2);
            }
            for (const x of [-12.2, -9.8])
                for (const z of [11.3, 13.5])
                    box(b, x, 1.35, z, .10, 2.35, .10, '#8a6b4d');
            for (let i = 0; i < 7; i++)
                box(b, -11 + i * .38, 2.48, 12.4, .08, .08, 2.55, '#8a6b4d');
            b.add('soft', -11, 2.55, 12.4, 2.7, .18, 2.2, '#7a9467');
            obstacle(nav, -11, 12.4, 2.7, 2.3);
            break;
        case 'iberian':
            house(b, nav, -15, -9, 5.2, 3.3, p.wall, '#c97b58', 'flat', '#6e99a3');
            arch(b, nav, -8, -10, p.wall, '#6e99a3');
            gazebo(b, nav, -15, 7, '#c97b58', '#6e99a3');
            b.add('soft', -14.5, .07, 2.8, 3.2, .08, 3.2, WATER, 0, 0, 0, 2);
            for (let i = 0; i < 12; i++) {
                const a = i * Math.PI / 6;
                b.add('soft', -14.5 + Math.cos(a) * 1.8, .25, 2.8 + Math.sin(a) * 1.8, .36, .26, .36, i % 2 ? '#f2e6c9' : '#6e99a3', 0, a);
            }
            for (const q of [[-18, -1], [-10, 10], [-4, 12]]) {
                plant(b, nav, q[0], q[1], 'broad', .95, '#779568');
                for (let k = 0; k < 5; k++) {
                    const a = k * 1.257;
                    b.add('sphere', q[0] + Math.cos(a) * .55, 1.75 + Math.sin(a * .8) * .15, q[1] + Math.sin(a) * .45, .10, .10, .10, '#dda25d');
                }
            }
            // Ceramic bench and market crates echo the courtyard palette without blocking station approaches.
            box(b, -7.5, .48, 9.1, 2.2, .18, .58, '#f1e4c9');
            for (const x of [-8.3, -6.7])
                box(b, x, .29, 9.1, .18, .42, .45, '#6f9ea2');
            obstacle(nav, -7.5, 9.1, 2.25, .62);
            for (let i = 0; i < 3; i++) {
                box(b, -17.2 + i * .72, .42, 11.2, .62, .55, .62, '#b88b61');
                for (let k = 0; k < 4; k++)
                    b.add('sphere', -17.42 + i * .72 + (k % 2) * .28, .78, 11.05 + Math.floor(k / 2) * .27, .09, .09, .09, '#dfa15b');
            }
            break;
        case 'redwood':
            house(b, nav, -14.5, -9, 5.0, 3.2, '#c5a078', '#6d6457', 'gable', '#6f8a6e');
            house(b, nav, -7.8, -10, 3.8, 2.7, '#b88d6a', '#6d6457', 'gable', '#6f8a6e');
            for (const q of [[-18, -1], [-16, 6], [-12, 14], [-6, 13], [-2, 16]]) {
                b.add('cylinder', q[0], 2.25, q[1], .34, 4.3, .34, '#8a5f49');
                for (let k = 0; k < 4; k++)
                    b.add('cone', q[0], 2.8 + k * .75, q[1], 1.55 - k * .13, 1.7, 1.55 - k * .13, '#57775e');
                obstacle(nav, q[0], q[1], .52, .52, true);
            }
            box(b, -19.4, .08, 14, 3.6, .08, 19, WATER, 0, 2);
            for (let i = 0; i < 13; i++)
                box(b, -17.1 + i * .54, .24, 7.6, .50, .12, 2.0, '#c59d72');
            flowerBed(b, -10, 4.5, 3.6, '#e0b6a2');
            // Tiny canvas tent and fire ring make the forest camp read at a glance.
            b.add('roof', -8.6, 1.05, 10.6, 2.8, 1.65, 2.4, '#d7c49b');
            box(b, -8.6, .22, 10.6, 2.6, .08, 2.2, '#8c765c');
            obstacle(nav, -8.6, 10.6, 2.7, 2.3);
            for (let i = 0; i < 9; i++) {
                const a = i * Math.PI * 2 / 9;
                b.add('soft', -4 + Math.cos(a) * .58, .22, 9.2 + Math.sin(a) * .58, .34, .24, .28, '#8b8174', 0, a);
            }
            b.add('cone', -4, .52, 9.2, .46, .75, .46, '#d89761');
            break;
        case 'lotus':
            house(b, nav, -15, -9, 5.0, 3.1, '#d9ae7f', '#8b6b53', 'stilt', '#6d9a87');
            gazebo(b, nav, -8, -9, '#b37a58', '#6d9a87');
            box(b, -19.4, .08, 12, 3.7, .08, 23, WATER, 0, 2);
            for (let i = 0; i < 10; i++) {
                const z = 3 + i * 1.7;
                b.add('soft', -19.1, .18, z, .65, .05, .55, '#77a784');
                if (i % 2 === 0)
                    blossom(b, -18.95, .40, z, .28, '#e8b8c0');
            }
            for (const q of [[-16, 0], [-13, 11], [-6, 14], [-2, 12]])
                plant(b, nav, q[0], q[1], q[0] < -10 ? 'palm' : 'bamboo', 1.05, p.leaf);
            for (let i = 0; i < 12; i++)
                box(b, -16 + i * .58, .22, 5.2, .52, .12, 2.15, '#c59b70');
            // Small market boat and woven baskets are scenery only.
            b.add('soft', -18.9, .30, 10.6, 1.25, .34, 3.4, '#9f744e');
            b.add('soft', -18.9, .48, 10.6, .92, .16, 2.9, '#ecd3a6');
            for (const z of [9.9, 11.3])
                box(b, -18.9, .60, z, .84, .07, .30, '#7e6048');
            for (let i = 0; i < 4; i++) {
                b.add('cylinder', -10.3 + i * .62, .46, 8.5, .32, .34, .32, '#b99065');
                b.add('torus', -10.3 + i * .62, .63, 8.5, .33, .10, .33, '#765d48');
            }
            break;
        case 'bosphorus':
            house(b, nav, -15, -9, 5.3, 3.4, '#e7d7b8', '#6f96a1', 'flat', '#6f96a1');
            arch(b, nav, -8, -10, '#e7d7b8', '#6f96a1');
            gazebo(b, nav, -14, 6, '#6f96a1', '#c2a16e');
            for (let i = 0; i < 8; i++) {
                const x = -17 + i * .65;
                box(b, x, .23, -3.2, .52, .055, .52, i % 2 ? '#6f96a1' : '#f1ead7');
            }
            for (const q of [[-18, 2], [-16, 12], [-7, 12], [-3, 8]])
                plant(b, nav, q[0], q[1], 'cypress', 1.05, '#657e65');
            flowerBed(b, -11, 3.5, 4, '#d7a3a0');
            // Blue-tile tea terrace with pendant lanterns.
            box(b, -13.2, .46, 10.2, 2.5, .16, 1.1, '#e9ddc5');
            for (const x of [-14.1, -12.3])
                box(b, x, .28, 10.2, .16, .44, .84, '#6f96a1');
            obstacle(nav, -13.2, 10.2, 2.55, 1.16);
            for (let i = 0; i < 5; i++) {
                const x = -16 + i * 1.25;
                box(b, x, 2.2, 13.2, .04, .65, .04, '#7f654e');
                b.add('soft', x, 1.85, 13.2, .32, .42, .28, i % 2 ? '#d8a06b' : '#6f96a1');
            }
            box(b, -13.5, 2.55, 13.2, 5.5, .04, .04, '#7f654e');
            break;
        case 'fynbos':
            house(b, nav, -15, -9, 5.2, 3.2, '#dccaa8', '#6f8270', 'gable', '#9a7b65');
            house(b, nav, -8, -10, 3.9, 2.8, '#e2d1b3', '#6f8270', 'gable', '#9a7b65');
            box(b, -19.4, .08, 15, 3.7, .08, 17, WATER, 0, 2);
            for (let i = 0; i < 28; i++) {
                const x = -18 + (i % 7) * 2.3, z = 2 + Math.floor(i / 7) * 3.6;
                b.add('soft', x, .36, z, .55, .38, .50, i % 3 === 0 ? '#d4918e' : i % 3 === 1 ? '#d7b066' : '#8aa072');
                if (i % 4 === 0)
                    b.add('soft', x, .66, z, .22, .28, .20, '#efd4b9');
            }
            for (const q of [[-18, -2], [-13, 13], [-5, 15]])
                plant(b, nav, q[0], q[1], 'broad', .9, '#708b6e');
            for (let i = 0; i < 7; i++)
                b.add('soft', -17 + i * 2.0, .25, 19, .9, .55, .7, '#9c9182', 0, i * .4);
            for (const x of [-17, -13])
                obstacle(nav, x, 19, .72, .55, true);
            // Cape lookout deck and layered protea planter.
            for (let i = 0; i < 8; i++)
                box(b, -17 + i * .62, .23, 7.9, .58, .11, 2.15, '#c39a73');
            for (const x of [-17.3, -12.9])
                box(b, x, .95, 8.85, .08, 1.45, .08, '#6f6857');
            box(b, -15.1, 1.46, 8.85, 4.5, .08, .08, '#6f6857');
            obstacle(nav, -15.1, 7.9, 4.7, 2.25);
            for (let i = 0; i < 12; i++) {
                const a = i * .52, x = -9.2 + Math.cos(a) * 1.6, z = 12.4 + Math.sin(a) * 1.1;
                b.add('soft', x, .48, z, .34, .42, .32, i % 2 ? '#d88f8f' : '#e6b06e');
                b.add('soft', x, .72, z, .16, .24, .16, '#f1d2af');
            }
            break;
        default:
            house(b, nav, -15, -9, 5, 3, p.wall, p.roof, 'gable', p.accent);
            for (const q of [[-18, 3], [-14, 11], [-5, 13]])
                plant(b, nav, q[0], q[1], 'broad', 1, p.leaf);
    }
    // Wayfinding lamps and authored flower patches make travel readable without crowding apparatus.
    for (const [x, z] of [[0, -8], [0, -2], [-1, 5]])
        lamp(b, x, z, p.accent);
    for (const [x, z] of [[-3, -5], [3, -6], [-2, 11]])
        flowerBed(b, x, z, 2.2, p.flower);
    // Two tiny, non-blocking residents give the miniature a sense of everyday life without creating quests or crowds.
    tinyResident(b, -10.7, -4.7, p.accent, id.charCodeAt(0));
    tinyResident(b, -4.4, 15.7, p.flower, id.charCodeAt(1));
    tinyCompanion(b, -12.0, -4.25, p.accent);
}
function tinyBird(b, x, y, z, s, c, phase) { const flap = Math.sin(phase) * .16; for (const side of [-1, 1])
    b.add('soft', x + side * .13 * s, y + Math.abs(side) * flap * s, z, .27 * s, .055 * s, .11 * s, c, 0, side * .18, side * (.35 + flap)); b.add('soft', x, y, z, .22 * s, .11 * s, .18 * s, c); }
function butterfly(b, x, y, z, s, c, phase) { const f = .28 + .18 * Math.sin(phase); for (const side of [-1, 1])
    b.add('soft', x + side * .11 * s, y, z, .18 * s, .18 * s, .04 * s, c, 0, side * f, side * .35); b.add('cylinder', x, y, z, .018 * s, .18 * s, .018 * s, '#6a5e50', 0, 0, Math.PI / 2); }
export function drawThemedRegion(b, id, time) {
    const r = REGIONS[id];
    if (r.theme === 'savanna') {
        for (let i = 0; i < 5; i++) {
            const x = -15 + i * 1.6, z = 17 + Math.sin(i) * .6;
            b.add('soft', x, .45, z, .85, .55, .38, '#d5b16e', 0, time * .04 + i * .2);
        }
    }
    if (r.theme === 'rainforest' || r.theme === 'terrace') {
        for (let i = 0; i < 6; i++) {
            const a = i * Math.PI / 3 + time * .03;
            b.add('soft', -6 + Math.cos(a) * 1.2, 2.8, 15 + Math.sin(a) * .7, .35, .08, .18, '#e9d69a', 0, a);
        }
    }
    if (r.theme === 'fjord' || r.theme === 'harbour' || r.theme === 'lakeside' || r.theme === 'redwood' || r.theme === 'lotus' || r.theme === 'fynbos') {
        for (let i = 0; i < 4; i++)
            b.add('soft', -19.3, .18, 10 + i * 2.4, 2.6, .03, .8, '#b9dbd8', 0, 0, Math.sin(time * .5 + i) * .05, 2);
    }
    if (r.theme === 'provence' || r.theme === 'tuscan' || r.theme === 'iberian' || r.theme === 'fynbos')
        for (let i = 0; i < 7; i++) {
            const a = time * .12 + i * .9;
            b.add('soft', -12 + Math.cos(a) * 2, .8, 10 + Math.sin(a) * 1.4, .18, .09, .12, '#f0e7ca', 0, a);
        }
    // A small amount of authored ambient life makes each diorama feel inhabited without becoming a particle field.
    const sky = ['oasis', 'savanna', 'aegean', 'harbour', 'fjord', 'redwood', 'bosphorus', 'fynbos'].includes(r.theme);
    if (sky) {
        for (let i = 0; i < 3; i++) {
            const a = time * .12 + i * 2.1;
            tinyBird(b, -9 + Math.cos(a) * 3.8, 3.4 + i * .28, 7 + Math.sin(a) * 2.2, .85, r.theme === 'oasis' || r.theme === 'savanna' ? '#6f6756' : '#f4ead4', a * 3);
        }
    }
    else {
        for (let i = 0; i < 3; i++) {
            const a = time * .18 + i * 2.09;
            butterfly(b, -10 + Math.cos(a) * 2.6, 1.0 + .16 * Math.sin(a * 1.7), 8 + Math.sin(a) * 1.8, .85, i % 2 ? r.accent : '#f0c99b', a * 5);
        }
    }
}